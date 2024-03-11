import React, { useState, useEffect } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaSkeleton from './components/Pizza/PizzaSkeleton';
import Pizza from './components/Pizza';
import Sort from './components/Sort';

import './styles/styles.scss';

const MOCKAPISECRET = import.meta.env.VITE_MOCKAPISECRET;

const App = () => {
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
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
};

export default App;
