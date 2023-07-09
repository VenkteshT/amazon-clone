import { configureStore } from "@reduxjs/toolkit";
import { reducer as amazonReducer } from "../redux/slice";
import { reducer as alertReducer } from "../redux/alert";

const store = configureStore({
  reducer: {
    amazonReducer,
    alertReducer,
  },
});

export default store;
