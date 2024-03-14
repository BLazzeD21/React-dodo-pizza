import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

export const Layout = ({ searchQueue, setSearchQueue }) => {
  return (
    <div className="wrapper">
      <Header
        searchQueue={searchQueue}
        setSearchQueue={setSearchQueue}
      />
      <div className="content">
        <div className="container">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
