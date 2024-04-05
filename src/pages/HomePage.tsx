import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import Categories from "../components/Categories";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import Pizza from "../components/PizzaBlock";
import Sort from "../components/Sort";
import SearchEmpty from "../components/Search/SearchEmpty";
import Pagination from "../components/Pagination";
import ErrorBlock from "../components/ErrorBlock";

import paginate from "../utils/pagination";
import { sortTypes } from "../utils/sortTypes";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../store/filter/slice";
import { selectFilter } from "../store/filter/selectors";
import { fetchProducts } from "../store/products/productsAPI";

import { selectProducts } from "../store/products/selectors";

import { Status } from "../store/products/types";

const PAGE_SIZE: number = 8;

const HomePage: React.FC = () => {
  window.scrollTo(0, 0);
  const isMounted = React.useRef<boolean>(false);
  const isSearch = React.useRef<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { categoryId, sortType, searchQueue, currentPage } =
    useSelector(selectFilter);

  const { products, status } = useSelector(selectProducts);

  const setSelectedCategory = React.useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    []
  );
  const setPage = React.useCallback(
    (page: number) => dispatch(setCurrentPage(page)),
    []
  );

  const fetchData = React.useCallback(() => {
    dispatch(
      fetchProducts({
        sortBy: sortType.sortBy,
        order: sortType.order,
        categoryId: String(categoryId),
      })
    );
  }, [dispatch, sortType, categoryId]);

  React.useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [searchQueue, categoryId, sortType]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryParams = {
        category: String(categoryId),
        sortBy: sortType.sortBy,
        order: sortType.order,
      };

      setSearchParams(queryParams);
    }

    isMounted.current = true;
  }, [sortType, categoryId]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType]);

  const filteredItems = React.useMemo(
    () =>
      products
        .filter((product: Product) => {
          return product.title
            .toLowerCase()
            .includes(searchQueue.toLowerCase());
        })
        .map((product: Product, index: number) => (
          <Pizza key={index} {...product} />
        )),
    [products, searchQueue]
  );

  const itemsCount = React.useMemo(() => filteredItems.length, [filteredItems]);

  const pages = React.useMemo(() => Math.ceil(itemsCount / PAGE_SIZE), [itemsCount]);

  const showPages: JSX.Element =
    pages - 1 ? (
      <Pagination pages={pages} page={currentPage} setPage={setPage} />
    ) : (
      <></>
    );

  const itemsPage = React.useMemo(
    () => paginate(filteredItems, PAGE_SIZE, currentPage + 1),
    [filteredItems, currentPage]
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
    <React.Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort />
      </div>
      <div className="content__items">{Content}</div>
      {Buttom}
    </React.Fragment>
  );
};

export default HomePage;
