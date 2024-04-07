import React from "react";

import { EmptyBlock } from "../";

import picture from "../../assets/images/dodoQualityControl4.svg";

export const CartEmply: React.FC = () => {
  return <EmptyBlock title="CART IS EMPTY" image={picture} />;
};
