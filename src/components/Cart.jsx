import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import cartImage from '../assets/icons/cartBlack.svg';
import CartClear from './CartClear';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import jingle from '../assets/sounds/jingle.wav';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);

  const [playSound] = useSound(jingle);

  const emptyCart = () => {
    if (confirm('Are you sure you want to empty the cart?')) {
      dispatch(clearCart());
    }
  };

  const payOrder = () => {
    dispatch(clearCart());
    alert('Your order has been placed, please wait.');
    playSound();
    navigate('/');
  };

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img src={cartImage} alt="dodoEmployee4"/>
          Cart
        </h2>
        <CartClear onClick={() => emptyCart()}/>
      </div>
      <div className="cart__items">
        {items.map((item) => (
          <CartItem
            key={`${item.id}_${item.size}_${item.type}`}
            {...item}
          />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Total pizzas: <b>{totalCount} pc.</b>
          </span>
          <span>
            Order price: <b>{Math.round(totalPrice * 100) / 100} $</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Come back</span>
          </Link>
          <div
            className="button pay-btn"
            onClick={payOrder}
          >
            <span>Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
