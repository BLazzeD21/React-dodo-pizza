import React from 'react';
import { Link } from 'react-router-dom';
import cart from '../assets/cartBlack.svg';
import CartClear from './CartClear';
import CartItem from './CartItem';

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img src={cart} alt="dodoEmployee4"/>
          Cart
        </h2>
        <CartClear />
      </div>
      <div className="cart__items">
        <CartItem />
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Total pizzas: <b>0 pc.</b>
          </span>
          <span>
            Order price: <b>0 $</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Come back</span>
          </Link>
          <div className="button pay-btn">
            <span>Pay now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
