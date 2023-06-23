import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  user: null,
  orders: [],
};

const slice = createSlice({
  name: "amazon-state-slice",
  initialState,
  reducers: {
    addToBasket(state, action) {
      const { item } = action.payload;
      const findItem = state.basket.find((el) => el.id === item.id);
      if (findItem) {
        findItem.qty++;
        return;
      } else state.basket = [...state.basket, { ...item, qty: 1 }];
    },
    removeFromBasket(state, action) {
      const { id } = action.payload;
      state.basket = [...state.basket.filter((el, i) => el.id !== id)];
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.basket.find((el) => el.id === id);
      item.qty++;
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const item = state.basket.find((el) => el.id === id);
      item.qty--;
      if (item.qty <= 0) {
        state.basket = state.basket.filter((el) => el.id !== id);
      }
    },
    setUser(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    setItem(state, action) {
      const { item } = action.payload;
      state.itemDetail = { ...item };
    },
    clearBasket(state, action) {
      state.orders = [...state.orders, ...state.basket];
      state.basket = [];
    },
  },
});

// actions
export const actions = slice.actions;

// reducer
export const reducer = slice.reducer;

// selector
export const stateSelector = (state) => state.amazonReducer;
