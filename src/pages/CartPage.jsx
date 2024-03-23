import React from 'react';
import CartEmplyPage from './CartEmptyPage';
import Cart from '../components/Cart';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <>
      {items.length ? <Cart /> : <CartEmplyPage />}
    </>
  );
};

export default CartPage;

