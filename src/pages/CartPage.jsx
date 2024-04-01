import React from 'react';
import CartEmplyPage from './CartEmptyPage';
import Cart from '../components/Cart';
import { useSelector } from 'react-redux';
import { selectCart } from '../store/slices/cartSlice';

const CartPage = () => {
  const { items } = useSelector(selectCart);

  return (
    <>
      {items.length ? <Cart /> : <CartEmplyPage />}
    </>
  );
};

export default CartPage;

