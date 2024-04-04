import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import Categories from "../components/Categories";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pizza from "../components/PizzaBlock";
import Sort from "../components/Sort";
import SearchEmpty from "../components/SearchEmpty";
import Pagination from "../components/Pagination";
import ErrorBlock from "../components/ErrorBlock";

import paginate from "../utils/pagination";
import { sortTypes } from "../utils/sortTypes";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../store/slices/filterSlice";

import { fetchProducts, selectProducts } from "../store/slices/productsSlice";

import { Status } from "../store/slices/productsSlice";

const PAGE_SIZE: number = 8;

const HomePage: React.FC = () => {
  window.scrollTo(0, 0);

  const isSearch = useRef<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { categoryId, sortType, searchQueue, currentPage } =
    useSelector(selectFilter);

  const { products, status } = useSelector(selectProducts);

  const setSelectedCategory = useCallback((id: number) => dispatch(setCategoryId(id)), []);
  const setPage = useCallback((page: number) => dispatch(setCurrentPage(page)), []);
  
  function fetchData(): void {
    dispatch(
      fetchProducts({
        sortBy: sortType.sortBy,
        order: sortType.order,
        categoryId: String(categoryId),
      })
    );
  }

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [searchQueue, categoryId, sortType]);

  useEffect(() => {
    const queryParams = {
      category: String(categoryId),
      sortBy: sortType.sortBy,
      order: sortType.order,
    };

    setSearchParams(queryParams);
  }, [sortType, categoryId]);

  useEffect(() => {
    if (searchParams.size) {
      const params: {
        category?: string;
        sortBy?: string;
        order?: string;
      } = {};

      searchParams.forEach((value: string, key: string) => {
        params[key as keyof typeof params] = value;
      });

      const filters: filter = {
        categoryId: Number(params.category),
        sortType: sortTypes.find(function (item) {
          return item.sortBy === params.sortBy && item.order === params.order;
        }) || {
          name: "popularity (asc)",
          sortBy: "rating",
          order: "asc",
        },
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

  const filteredItems: JSX.Element[] = products
    .filter((product: Product) => {
      return product.title.toLowerCase().includes(searchQueue.toLowerCase());
    })
    .map((product: Product, index: number) => (
      <Pizza key={index} {...product} />
    ));

  const itemsCount: number = filteredItems.length;

  const pages: number = Math.ceil(itemsCount / PAGE_SIZE);

  const showPages: JSX.Element =
    pages - 1 ? (
      <Pagination
        pages={pages}
        page={currentPage}
        setPage={setPage}
      />
    ) : (
      <></>
    );

  const itemsPage: JSX.Element[] = paginate(
    filteredItems,
    PAGE_SIZE,
    currentPage + 1
  );

  const Skeleton: JSX.Element[] = [...new Array(8)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  let Content: JSX.Element | JSX.Element[];
  let Buttom: JSX.Element;

  switch (status) {
    case Status.REJECTED:
      Content = <></>;
      Buttom = <ErrorBlock />;
      break;
    case Status.PENDING:
      Content = Skeleton;
      Buttom = <></>;
      break;
    default:
      Content = itemsPage.length ? itemsPage : <></>;
      Buttom = itemsPage.length ? (
        showPages
      ) : (
        <SearchEmpty searchQueue={searchQueue} />
      );
      break;
  }

  return (
    <Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <div className="content__items">{Content}</div>
      {Buttom}
    </Fragment>
  );
};

export default HomePage;
