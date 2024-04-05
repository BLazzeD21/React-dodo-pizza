const calcucateTotalCount = (items: CartItem[]): number => {
  return items.reduce(
    (accumulator: number, currentItem: CartItem, index: number) => {
      const count = currentItem.count ? currentItem.count : 0;
      return accumulator + count;
    },
    0
  );
};

const calcucateTotalPrice = (items: CartItem[]): number => {
  return items.reduce(
    (accumulator: number, currentItem: CartItem, index: number) => {
      const count = currentItem.count ? currentItem.count : 0;
      const price = currentItem.price;
      return accumulator + (count * price);
    },
    0
  );
};

export const getCartFromLS = () => {
  const cartItems = localStorage.getItem("cartItems");

  const cart: CartItem[] | [] = cartItems ? JSON.parse(cartItems) : [];

  const totalCount: number = calcucateTotalCount(cart);

  const totalPrice: number = calcucateTotalPrice(cart);

  return { cart, totalCount, totalPrice };
};
