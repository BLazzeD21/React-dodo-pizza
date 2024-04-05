import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
  const isMounted = useRef<boolean>(false);
  const isSearch = useRef<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { categoryId, sortType, searchQueue, currentPage } =
    useSelector(selectFilter);

  const { products, status } = useSelector(selectProducts);

  const setSelectedCategory = useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    []
  );
  const setPage = useCallback(
    (page: number) => dispatch(setCurrentPage(page)),
    []
  );

  const fetchData = useCallback(() => {
    dispatch(
      fetchProducts({
        sortBy: sortType.sortBy,
        order: sortType.order,
        categoryId: String(categoryId),
      })
    );
  }, [dispatch, sortType, categoryId]);

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [searchQueue, categoryId, sortType]);

  useEffect(() => {
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

  const filteredItems = useMemo(
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

  const itemsCount = useMemo(() => filteredItems.length, [filteredItems]);

  const pages = useMemo(() => Math.ceil(itemsCount / PAGE_SIZE), [itemsCount]);

  const showPages: JSX.Element =
    pages - 1 ? (
      <Pagination pages={pages} page={currentPage} setPage={setPage} />
    ) : (
      <></>
    );

  const itemsPage = useMemo(
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
