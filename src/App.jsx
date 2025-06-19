
import CartPage from "./features/pages/CartPage";
import Home from "./features/pages/Home";
import LoginPage from "./features/pages/LoginPage";
import SignupPage from "./features/pages/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
   {
    path: "/cart",
    element: <CartPage/>,
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
