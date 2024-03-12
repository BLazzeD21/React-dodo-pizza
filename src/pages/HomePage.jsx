import React, { Fragment, useState, useEffect } from 'react';
import Categories from '../components/Categories';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pizza from '../components/PizzaBlock';
import Sort from '../components/Sort';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://${MOCKAPISECRET}.mockapi.io/api/pizzas`)
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
  }, []);

  return (
    <Fragment>
      <div className="content__top">
        <Categories />
        <Sort />
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
