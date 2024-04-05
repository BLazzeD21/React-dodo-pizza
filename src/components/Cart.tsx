import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";

import cartImage from "../assets/icons/cartBlack.svg";
import CartClear from "./CartClear";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, selectCart } from "../store/slices/cartSlice";
import jingle from "../assets/sounds/jingle.wav";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalCount, totalPrice } = useSelector(selectCart);

  const [playSound] = useSound(jingle);

  const emptyCart = (): void => {
    if (confirm("Are you sure you want to empty the cart?")) {
      dispatch(clearCart());
      navigate("/");
    }
  };

  const payOrder = async (): Promise<void> => {
    dispatch(clearCart());
    alert("Your order has been placed, please wait.");

    try {
      const context = new window.AudioContext();
      await context.resume();
      playSound();
    } catch (error) {
      console.error("Failed to start Audio: ", error);
    }

    navigate("/");
  };

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="content__title">
          <img src={cartImage} alt="dodoEmployee4" />
          Cart
        </h2>
        <CartClear onClick={() => emptyCart()} />
      </div>
      <div className="cart__items">
        {items.map((item: any) => (
          <CartItem key={`${item.id}_${item.size}_${item.type}`} {...item} />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Total pizzas: <b>{totalCount} pc.</b>
          </span>
          <span>
            Order price: <b>{Math.round(totalPrice * 100) / 100} $</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Come back</span>
          </Link>
          <div className="button pay-btn" onClick={payOrder}>
            <span>Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
