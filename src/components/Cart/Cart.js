import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, count: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          name={item.name}
          key={item.id}
          count={item.count}
          price={item.price}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const handleOrder = () => {
    setShowOrderForm(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-3810e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: ctx.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const onCancel = () => {
    setShowOrderForm(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showOrderForm && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onCancel} />
      )}
      {!showOrderForm && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Succesfully sent the order!!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onBackdropClick={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
