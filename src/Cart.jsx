import React, { useContext, useState } from "react";
import { messageContext } from "./App";
import "../src/App.css";

function Cart() {
  const { ...products } = useContext(messageContext);
  console.log(products);

  const cartItems = Object.values(products);
  console.log(cartItems);

  const [cart, setCart] = useState(
    cartItems.map((item) => ({ ...item, quantity: 1 }))
  );

  function increaseQuantity(itemId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(itemId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  const productTotal = (item) => {
    return item.price * item.quantity;
  };

  const lastItem = cart[cart.length - 4]; // Get the last item in the cart array

  const totalPrice = productTotal(lastItem);

  return (
    <div className="display-container">
      <h1>Cart Page</h1>

      <div className="row product-detail">
        <div className=" col-3 image-container">
          <img src={lastItem.thumbnail} alt="Product Thumbnail" />
        </div>
        <div className=" col-5 product">
          <h2>{lastItem.title}</h2>
          <p>Details of Product</p>
          <p>{lastItem.description}</p>
        </div>
        <div className=" col-3 quantity">
          <button
            className="quantityButton"
            onClick={() => decreaseQuantity(lastItem.id)}
          >
            {" "}
            -{" "}
          </button>
          <span>{lastItem.quantity}</span>
          <button
            className="quantityButton"
            onClick={() => increaseQuantity(lastItem.id)}
          >
            {" "}
            +{" "}
          </button>
          <p className="price">Rs : {lastItem.price}</p>
        </div>
      </div>

      <div className="shipping">
        <p className="subTotal">
          Subtotal : <span> {`Rs ${totalPrice}`}</span>
        </p>
        <p className="shipCharge">
          Shipping Charges : <span>Free</span>
        </p>
      </div>

      <div className="total">
        <p>
          Total : <span>{`Rs ${totalPrice}`}</span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
