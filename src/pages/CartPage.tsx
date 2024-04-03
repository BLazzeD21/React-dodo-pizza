import React from "react";
import { useSelector } from "react-redux";
import CartEmplyPage from "./CartEmptyPage";
import Cart from "../components/Cart";
import { selectCart } from "../store/slices/cartSlice";

const CartPage: React.FC = () => {
  const { items } = useSelector(selectCart);

  return <>{items.length ? <Cart /> : <CartEmplyPage />}</>;
};

export default CartPage;
