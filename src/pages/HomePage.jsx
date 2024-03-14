import React, { Fragment, useState, useEffect } from 'react';
import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';
import SearchEmpty from '../components/SearchEmpty';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const sortTypes = [
  { name: 'popularity (asc)', sortBy: 'rating', order: 'asc' },
  { name: 'popularity (desc)', sortBy: 'rating', order: 'desc' },
  { name: 'price (asc)', sortBy: 'price', order: 'asc' },
  { name: 'price (desc)', sortBy: 'price', order: 'desc' },
  { name: 'alphabet (asc)', sortBy: 'title', order: 'asc' },
  { name: 'alphabet (desc)', sortBy: 'title', order: 'desc' },
];

const HomePage = ({ searchQueue }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortBy, setSortBy] = useState( sortTypes[0] );

  useEffect(() => {
    setIsLoading(true);

    const url = new URL(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`);

    url.searchParams.append('sortBy', sortBy.sortBy);
    url.searchParams.append('order', sortBy.order);
    url.searchParams.append('category', selectedCategory);
    url.searchParams.append('page', 1);
    // url.searchParams.append('limit', 6);

    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTimeout(() => {
            setPizzas(data);
            setIsLoading(false);
          }, 500);
        });

    window.scrollTo(0, 0);
  }, [selectedCategory, sortBy]);

  const Skeleton = [...new Array(8)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const Pizzas = pizzas
      .filter((pizza) => {
        return pizza.title.toLowerCase().includes(searchQueue.toLowerCase());
      })
      .map((pizza, index) => <Pizza key={index} {...pizza} />);

  const nothingFound = Pizzas.length === 0;


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
        { isLoading ? Skeleton : Pizzas }
      </div>
      {nothingFound ? <SearchEmpty searchQuery={searchQueue} /> : ''}
    </Fragment>
  );
};

export default HomePage;
