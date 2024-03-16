import React, { Fragment, useState, useEffect } from 'react';
import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import SearchEmpty from '../components/SearchEmpty';
import Pagination from '../components/Pagination';
import paginate from '../utils/pagination';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const PAGE_SIZE = 8;

const sortTypes = [
  { name: 'popularity (asc)', sortBy: 'rating', order: 'asc' },
  { name: 'popularity (desc)', sortBy: 'rating', order: 'desc' },
  { name: 'price (asc)', sortBy: 'price', order: 'asc' },
  { name: 'price (desc)', sortBy: 'price', order: 'desc' },
  { name: 'alphabet (asc)', sortBy: 'title', order: 'asc' },
  { name: 'alphabet (desc)', sortBy: 'title', order: 'desc' },
];

const HomePage = ({ searchQueue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortBy, setSortBy] = useState(sortTypes[0]);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
    setIsLoading(true);

    const url = new URL(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`);

    url.searchParams.append('sortBy', sortBy.sortBy);
    url.searchParams.append('order', sortBy.order);
    url.searchParams.append('category', selectedCategory);

    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setItems(data);
          setIsLoading(false);
        });

    window.scrollTo(0, 0);
  }, [selectedCategory, sortBy]);

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
    ( pages - 1 ) ? (
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

  const nothingFound = ( itemsCount === 0 );

  return (
    <Fragment>
      <div className="content__top">
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={(id) => setSelectedCategory(id)}
        />
        <Sort
          sortBy={sortBy}
          setSortBy={(type) => setSortBy(type)}
          sortTypes={sortTypes}
        />
      </div>
      <div className={'content__items'}>
        {isLoading ? Skeleton : itemsPage}
      </div>
      {nothingFound ? <SearchEmpty searchQuery={searchQueue} /> : showPages}
    </Fragment>
  );
};

export default HomePage;
