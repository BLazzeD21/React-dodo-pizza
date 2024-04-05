import React from 'react';
import picture from '../../assets/images/dodoQualityControl4.svg';
import EmptyBlock from '../EmptyBlock';

const CartEmplyPage: React.FC = () => {
  return (
    <EmptyBlock title='CART IS EMPTY' image={picture}/>
  );
};

export default CartEmplyPage;
