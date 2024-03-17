import React, { lazy, useState, createContext } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './styles/styles.scss';

const HomePage = lazy(() => import('./pages/HomePage'));
const Layout = lazy(() => import('./pages/Layout'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const CartPage = lazy(() => import('./pages/CartPage'));

export const SearchContext = createContext('');

const App = () => {
  const [searchQueue, setSearchQueue] = useState('');

  const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>),
  );

  return (
    <SearchContext.Provider value={{ searchQueue, setSearchQueue }}>
      <RouterProvider router={router} />
    </SearchContext.Provider>
  );
};

export default App;
