import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import SearchEmpty from '../components/SearchEmpty';
import Pagination from '../components/Pagination';

import paginate from '../utils/pagination';

import { setCategoryId } from '../store/slices/filterSlice';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const PAGE_SIZE = 8;

const HomePage = () => {
  const dispatch = useDispatch();
  const { categoryId,
    sortType,
    searchQueue } = useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(0);

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
  }, [categoryId, sortType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, categoryId, sortType]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQueue]);

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
        setPage={(page) => setCurrentPage(page)}
      />
    ) : (
      ''
    );

  const itemsPage = paginate(filteredItems, PAGE_SIZE, currentPage + 1);

  const Skeleton = [...new Array(8)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const nothingFound = itemsCount === 0;

  return (
    <Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <div className="content__items">{isLoading ? Skeleton : itemsPage}</div>
      {nothingFound ? <SearchEmpty searchQuery={searchQueue} /> : showPages}
    </Fragment>
  );
};

export default HomePage;
