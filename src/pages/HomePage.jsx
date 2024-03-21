import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import SearchEmpty from '../components/SearchEmpty';
import Pagination from '../components/Pagination';

import paginate from '../utils/pagination';

import { sortTypes } from '../utils/sortTypes';

import { setCategoryId,
  setCurrentPage,
  setFilters } from '../store/slices/filterSlice';
import { useSearchParams } from 'react-router-dom';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const PAGE_SIZE = 8;

const HomePage = () => {
  window.scrollTo(0, 0);

  const isSearch = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { categoryId, sortType,
    searchQueue, currentPage } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    setIsLoading(true);
    const url = new URL(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`);

    url.searchParams.append('sortBy', sortType.sortBy);
    url.searchParams.append('order', sortType.order);
    url.searchParams.append('category', categoryId);

    axios({
      method: 'GET',
      url: url,
      headers: {
        'content-type': 'application/json',
      },
    }).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [searchQueue, categoryId, sortType]);

  useEffect(() => {
    const queryString = {
      category: categoryId,
      sortBy: sortType.sortBy,
      order: sortType.order,
    };

    setSearchParams(queryString);
  }, []);

  useEffect(() => {
    if (searchParams.size) {
      const params = {};

      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const filters = {
        categoryId: params.category,
        sortType: sortTypes.find(function(item) {
          return item.sortBy === params.sortBy &&
          item.order === params.order;
        }),
      };

      dispatch(setFilters(filters));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType]);


  const filteredItems = items
      .filter((pizza) => {
        return pizza.title.toLowerCase().includes(searchQueue.toLowerCase());
      })
      .map((pizza, index) => <Pizza key={index} {...pizza} />);

  const itemsCount = filteredItems.length;

  const pages = Math.ceil(itemsCount / PAGE_SIZE);

  const showPages =
    pages - 1 ? (
      <Pagination
        pages={pages}
        page={currentPage}
        setPage={(page) => dispatch(setCurrentPage(page))}
      />
    ) : (
      ''
    );

  const itemsPage = paginate(filteredItems, PAGE_SIZE, currentPage + 1);

  const Skeleton = [...new Array(8)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const nothingFound = itemsPage.length === 0;

  const Content = isLoading ? Skeleton :
    (itemsPage.length) ? itemsPage : '';

  return (
    <Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <div className="content__items">
        {Content}
      </div>
      {nothingFound ? <SearchEmpty /> : showPages}
    </Fragment>
  );
};

export default HomePage;
