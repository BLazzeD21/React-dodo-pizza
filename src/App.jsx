import React, { lazy } from 'react';
import { Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements } from 'react-router-dom';

import './styles/styles.scss';

const Home = lazy(() => import('./pages/Home'));
const Layout = lazy(() => import('./pages/Layout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Cart = lazy(() => import('./pages/Cart'));

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='*' element={<NotFound />} />
    </Route>));

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
