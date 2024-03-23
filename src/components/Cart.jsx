import React from 'react';
import { Link } from 'react-router-dom';
import cartImage from '../assets/icons/cartBlack.svg';
import CartClear from './CartClear';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';

const Cart = () => {
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img src={cartImage} alt="dodoEmployee4"/>
          Cart
        </h2>
        <CartClear onClick={() => dispatch(clearCart())}/>
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
          <div className="button pay-btn">
            <span>Pay now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
