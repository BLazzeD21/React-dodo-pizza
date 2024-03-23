import React from 'react';
import Plus from './Plus';

const CartItem = (props) => {
  const { title, type, size, count, price, imageUrl } = props;

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, {size} cm</p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline
      button--circle cart__item-count-minus"
        >
          <Plus />
        </button>
        <b>{count}</b>
        <button
          className="button button--outline
      button--circle cart__item-count-plus"
        >
          <Plus />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price} $</b>
      </div>
      <div className="cart__item-remove">
        <button className="button button--outline button--circle">
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
