import React, { lazy, useState } from 'react';
import { Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom';

import './styles/styles.scss';

const HomePage = lazy(() => import('./pages/HomePage'));
const Layout = lazy(() => import('./pages/Layout'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const CartPage = lazy(() => import('./pages/CartPage'));


const App = () => {
  const [searchQueue, setSearchQueue] = useState('');

  const router = createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={
        <Layout
          searchQueue={searchQueue}
          setSearchQueue={setSearchQueue}
        />
      }>
        <Route index element={<HomePage searchQueue={searchQueue} />} />

        <Route path='/cart' element={<CartPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>));

  return (
    <RouterProvider router={router} />
  );
};

export default App;
