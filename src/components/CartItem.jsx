import React from 'react';
import Circle from './Circle';
// import { removeFromCart } from '../store/slices/cartSlice';
// import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  // const dispatch = useDispatch();

  const { id, title, type, size, count, price, imageUrl } = props;

  const pizzaTypes = ['thin', 'traditional'];
  const pizzaSizes = [25, 30, 35];

  // const removeItem = () => {
  //   const item = {
  //     id, title, imageUrl, size, type, price,
  //   };

  //   dispatch(removeFromCart(item));
  // };

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
        >
          <Circle />
        </button>
        <b>{count}</b>
        <button
          className="button button--outline
      button--circle cart__item-count-Circle"
        >
          <Circle />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price} $</b>
      </div>
      <div className="cart__item-remove">
        <button
          className="button button--outline button--circle"
          // onClick={() => removeItem()}
        >
          <Circle />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
