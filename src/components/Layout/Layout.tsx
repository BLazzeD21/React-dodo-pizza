import { Outlet } from 'react-router-dom';
import Header from '../Header';
import React from 'react';

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

export default Layout;
