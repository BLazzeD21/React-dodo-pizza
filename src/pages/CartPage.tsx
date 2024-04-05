import React from "react";
import { useSelector } from "react-redux";

import CartEmply from "../components/Cart/CartEmpty";
import Cart from "../components/Cart/Cart";

import { selectCart } from "../store/cart/selectors";

const CartPage: React.FC = () => {
  const { items } = useSelector(selectCart);

  return (
    <React.Fragment>{items.length ? <Cart /> : <CartEmply />}</React.Fragment>
  );
};

export default CartPage;
