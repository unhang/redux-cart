import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const initialState = {
  items: [], // {id: 'p1', description: '', price: 9, quantity: 0,}
  totalPrice: 0,
  totalQuantity: 0,
  changed: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      state.totalPrice += newItem.price;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      } else {
        existingItem.quantity += 1;
      }
    },
    // action.payload = id
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;

      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      state.totalPrice -= existingItem.price;
    },
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
    }
  }
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

const getCartData = () => async (dispatch) => {
  const sendRequest = async () => {
    const response = await fetch(
      "https://hang-restaurant-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
    );
    if (!response.ok) {
      throw new Error("Loading cart failed");
    }
    return response.json();
  };

  try {
    const cart = await sendRequest();
    dispatch(
      cartActions.setCart({
        items: cart.items || [],
        totalPrice: cart.totalPrice || 0,
        totalQuantity: cart.totalQuantity || 0
      })
    );
  } catch (err) {
    console.log(err.message);
  }
};

const updateCart = (cart) => async (dispatch) => {
  dispatch(
    uiActions.showNotification({
      status: "pending",
      title: "Pending...",
      message: "Sending cart data"
    })
  );

  const sendRequest = async () => {
    const response = await fetch(
      "https://hang-restaurant-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart)
      }
    );

    if (!response.ok) {
      throw new Error("Sending data failed");
    }
  };

  try {
    await sendRequest();
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success",
        message: "Sent cart data successfully!"
      })
    );
  } catch (err) {
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "Error",
        message: "Sent cart data failed!"
      })
    );
  }
};

export { cartReducer, cartActions, updateCart, getCartData };
