import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Loading, Layout } from './components'

const CartPage = React.lazy(() => import("./pages/CartPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

import "./styles/styles.scss";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <React.Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};

export default App;
