import React from 'react';
import Circle from './Circle';
import { useDispatch } from 'react-redux';
import { addToCart, deleteFromCart,
  removeFromCart } from '../store/slices/cartSlice';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { id, title, type, size, count, price, imageUrl } = props;

  const pizzaTypes = ['thin', 'traditional'];
  const pizzaSizes = [25, 30, 35];

  const totalPrice = Math.round(price * count * 100) / 100;

  const item = {
    id, title, imageUrl, size, type, price,
  };

  const addItem = () => {
    dispatch(addToCart(item));
  };

  const removeItem = () => {
    if (confirm('Are you sure you want to remove?')) {
      dispatch(removeFromCart(item));
    }
  };

  const deleteItem = () => {
    if (confirm('Are you sure you want to delete?')) {
      dispatch(deleteFromCart(item));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {pizzaTypes[type]}, {pizzaSizes[size]} cm
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline
      button--circle cart__item-count-minus"
          onClick={() => removeItem()}
        >
          <Circle />
        </button>
        <b>{count}</b>
        <button
          className="button button--outline
      button--circle cart__item-count-Circle"
          onClick={() => addItem()}
        >
          <Circle />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{totalPrice} $</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle"
          onClick={() => deleteItem()}
        >
          <Circle />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
