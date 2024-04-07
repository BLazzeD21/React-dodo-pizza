import React from "react";

import { EmptyBlock } from "../components";

import picture from "../assets/images/dodoEmployee1.svg";

const NotFound: React.FC = () => {
  return <EmptyBlock title="PAGE NOT FOUND" image={picture} />;
};

export default NotFound;
