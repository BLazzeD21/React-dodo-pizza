import React from "react";

import EmptyBlock from "./EmptyBlock";

import picture from "../assets/images/dodoPlanet.svg";

const ErrorBlock: React.FC = () => {
  return (
    <EmptyBlock title="Error receiving data from server" image={picture} />
  );
};

export default ErrorBlock;
