import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.count;

    const existingDish = state.items.find((dish) => dish.id === action.item.id);

    let updatedItems = state.items;
    if (existingDish) {
      existingDish.count += action.item.count;
      updatedItems = [...state.items];
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingDishIdx = state.items.findIndex((dish) => {
      return dish.id === action.id;
    });
    const updatedTotalAmount =
      state.totalAmount - state.items[existingDishIdx].price;

    let updatedItems;
    if (state.items[existingDishIdx].count === 1) {
      updatedItems = state.items.filter((dish) => {
        return dish.id !== action.id;
      });
    } else {
      updatedItems = [...state.items];
      updatedItems[existingDishIdx].count -= 1;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items, // {name: 'Sushi', count: 3, price: 20.99, id: 'm1'}
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
