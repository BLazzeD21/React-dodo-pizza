export const calculatePrice = (
  price: number,
  activeType: number,
  activeSize: number
): number => {
  return (
    Math.round(
      (price + price * activeType * 0.2 + price * activeSize * 0.3) * 100
    ) / 100
  );
};
