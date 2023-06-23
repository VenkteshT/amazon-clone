import { configureStore } from "@reduxjs/toolkit";
import { reducer as amazonReducer } from "../redux/slice";
const store = configureStore({
  reducer: {
    amazonReducer,
  },
});

export default store;
