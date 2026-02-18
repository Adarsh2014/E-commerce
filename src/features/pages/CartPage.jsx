import React from "react";
import Cart from "../cart/Cart";
import NavBar from "../navbar/NavBar";

const CartPage = () => {
  return (
    <div>
      <NavBar>
        <Cart />
      </NavBar>
    </div>
  );
};

export default CartPage;
