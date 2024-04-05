import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { calculatePrice } from "../../utils/calculatePrice";

import { addToCart } from "../../store/cart/slice";
import { RootState } from "../../store/store";

type PizzaProps = {
  id: number;
  title: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
};

const pizzaTypes: string[] = ["thin", "traditional"];

const Pizza: React.FC<PizzaProps> = (props) => {
  const dispatch = useDispatch();
  const { id, title, imageUrl, types, sizes, price } = props;

  const [activeSize, setActiveSize] = React.useState<number>(0);
  const [activeType, setActiveType] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(price);

  React.useEffect(() => {
    const calculatedPrice: number = calculatePrice(
      price,
      activeType,
      activeSize
    );

    setTotalPrice(calculatedPrice);
  }, [activeSize, activeType]);

  const count = useSelector((state: RootState) => {
    const items = state.cart.items.filter(
      (item: any) =>
        item.id === id && item.size === activeSize && item.type === activeType
    );

    if (items.length > 0) {
      const initialCount: number = 0;

      const Count = items.reduce(
        (accumulator: number, currentItem: CartItem) => {
          if (currentItem.count) {
            return accumulator + currentItem.count;
          } else return 0;
        },
        initialCount
      );

      return Count;
    } else {
      return 0;
    }
  });

  const addItem = () => {
    const item: CartItem = {
      id,
      title,
      imageUrl,
      size: activeSize,
      type: activeType,
      price: totalPrice,
    };

    dispatch(addToCart(item));
  };

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={type}
                className={activeType === index ? "active" : ""}
                onClick={() => {
                  setActiveType(index);
                }}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={activeSize === index ? "active" : ""}
                onClick={() => {
                  setActiveSize(index);
                }}
              >
                {size} cm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">Price: {totalPrice} $</div>
          <button
            onClick={() => addItem()}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627
              0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373
               4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2
               7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627
                12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627
                 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>add</span>
            {count ? <i>{count}</i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
