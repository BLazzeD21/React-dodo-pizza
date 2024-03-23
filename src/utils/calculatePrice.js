export const calculatePrice = (price, activeType, activeSize) => {
  return Math.round(
      (price + price * activeType * 0.2 + price * activeSize * 0.3) * 100,
  ) / 100;
};
