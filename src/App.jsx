import React, { lazy } from 'react';
import { Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom';

import './styles/styles.scss';

const HomePage = lazy(() => import('./pages/HomePage'));
const Layout = lazy(() => import('./pages/Layout'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const CartPage = lazy(() => import('./pages/CartPage'));

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>));

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
