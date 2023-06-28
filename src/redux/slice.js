import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  basket: [],
  user: null,
  orders: [],
  searchableItem: null,
  itemDetails: {},
};

const slice = createSlice({
  name: "amazon-state-slice",
  initialState,
  reducers: {
    setProducts(state, action) {
      const { products } = action.payload;
      state.products = [...products];
    },
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
    clearBasket(state, action) {
      state.orders = [...state.orders, ...state.basket];
      state.basket = [];
    },
    setItem(state, action) {
      const { item } = action.payload;
      state.itemDetails = { ...item };
    },
    searchItem(state, action) {
      const { data } = action.payload;
      state.searchableItem = data;
    },
  },
});

// actions
export const actions = slice.actions;

// reducer
export const reducer = slice.reducer;

// selector
export const stateSelector = (state) => state.amazonReducer;
