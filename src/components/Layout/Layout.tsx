import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../";

export const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

