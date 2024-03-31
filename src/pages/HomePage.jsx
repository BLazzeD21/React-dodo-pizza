import React, { Fragment, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import SearchEmpty from '../components/SearchEmpty';
import Pagination from '../components/Pagination';
import ErrorBlock from '../components/ErrorBlock';

import paginate from '../utils/pagination';
import { sortTypes } from '../utils/sortTypes';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../store/slices/filterSlice';

import { fetchProducts } from '../store/slices/productsSlice';

const PAGE_SIZE = 8;

const HomePage = () => {
  window.scrollTo(0, 0);

  const isSearch = useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { categoryId, sortType, searchQueue, currentPage } = useSelector(
      (state) => state.filter,
  );

  const { products, status } = useSelector((state) => state.products);

  function fetchData() {
    dispatch(
        fetchProducts({
          sortBy: sortType.sortBy,
          order: sortType.order,
          categoryId: categoryId,
        }),
    );
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
  }, [sortType, categoryId]);

  useEffect(() => {
    if (searchParams.size) {
      const params = {};

      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const filters = {
        categoryId: params.category,
        sortType: sortTypes.find(function(item) {
          return item.sortBy === params.sortBy && item.order === params.order;
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

  const filteredItems = products
      .filter((product) => {
        return product.title.toLowerCase().includes(searchQueue.toLowerCase());
      })
      .map((product, index) => <Pizza key={index} {...product} />);

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

  let Content;

  switch (status) {
    case 'error':
      Content = <ErrorBlock />;
      break;
    case 'loading':
      Content = Skeleton;
      break;
    default:
      Content = itemsPage.length ? itemsPage : '';
      break;
  }

  const buttom =
    status === 'error' ? '' :
    nothingFound ? <SearchEmpty /> :
    showPages;

  return (
    <Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <div className="content__items">{Content}</div>
      {buttom}
    </Fragment>
  );
};

export default HomePage;
