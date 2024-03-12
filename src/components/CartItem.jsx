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
          alt="Pizza"
        />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type}, {size} cm</p>
      </div>
      <div className="cart__item-count">
        <div
          className="button button--outline
      button--circle cart__item-count-minus"
        >
          <Plus />
        </div>
        <b>{count}</b>
        <div
          className="button button--outline
      button--circle cart__item-count-plus"
        >
          <Plus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price} $</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle">
          <Plus />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
