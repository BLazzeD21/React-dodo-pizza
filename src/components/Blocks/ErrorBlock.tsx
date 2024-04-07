import React from "react";

import { EmptyBlock } from "../";

import picture from "../../assets/images/dodoPlanet.svg";

export const ErrorBlock: React.FC = () => {
  return (
    <EmptyBlock title="Error receiving data from server" image={picture} />
  );
};
