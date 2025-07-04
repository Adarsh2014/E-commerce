import CartPage from "./features/pages/CartPage";
import Checkout from "./features/pages/Checkout";
import Home from "./features/pages/Home";
import LoginPage from "./features/pages/LoginPage";
import SignupPage from "./features/pages/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from "./features/pages/ProductDetaiPage";
import Protected from "./features/auth/component/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemByUseridAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./features/pages/404";
import OrderSuccessPage from "./features/pages/OrderSuccessPage";
import AboutPage from "./features/pages/AboutPage";
import TeamPage from "./features/pages/TeamPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/about",
    element: (
      <Protected>
        <AboutPage />
      </Protected>
    ),
  },
  {
    path: "/team",
    element: (
      <Protected>
        <TeamPage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUseridAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
