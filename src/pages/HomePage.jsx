import React, { Fragment, useState, useEffect } from 'react';
import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const sortTypes = [
  { name: 'popularity 🠕', sortBy: 'rating', order: 'asc' },
  { name: 'popularity 🠗', sortBy: 'rating', order: 'asc' },
  { name: 'price 🠕', sortBy: 'price', order: 'asc' },
  { name: 'price 🠗', sortBy: 'price', order: 'desc' },
  { name: 'alphabet 🠕', sortBy: 'title', order: 'desc' },
  { name: 'alphabet 🠗', sortBy: 'title', order: 'desc' },
];

const HomePage = () => {
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

      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {
            isLoading ?
              [...new Array(8)].map((_, index) => (
                <PizzaSkeleton key={index} />
              )) :
              pizzas.map((pizza, index) => <Pizza key={index} {...pizza} />)
        }
      </div>
    </Fragment>
  );
};

export default HomePage;
