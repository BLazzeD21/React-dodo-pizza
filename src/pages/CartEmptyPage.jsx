import React from 'react';
import picture from '../assets/dodoEmployee1.svg';
import EmptyBlock from '../components/EmptyBlock';

const CartEmplyPage = () => {
  return (
    <EmptyBlock title='CART IS EMPTY' image={picture}/>
  );
};

export default CartEmplyPage;
