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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
