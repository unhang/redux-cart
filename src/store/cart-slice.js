import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id: 'p1', description: '', price: 9, quantity: 0,}
  totalPrice: 0,
  totalQuantity: 0
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

      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
      state.totalPrice -= existingItem.price;
    }
  }
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export { cartReducer, cartActions };
