import "./App.css";
import Checkout from "./components/checkout/Checkout";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "./redux/slice";
import Login from "./components/login/Login";
import SignUp from "./components/singup/SignUp";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { actions } from "./redux/slice";
import { useDispatch } from "react-redux";
import Payment from "./components/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./components/productDetail/Detail";
import items from "./products";
const { setUser, setProducts } = actions;

const promise = loadStripe(
  `pk_test_51NM0iQSGOqRmeIbnFHCBqAQFXkplhQC8buvwvRvy7S3OAcOfjHOZSIrnMMkzO9m2GGvzXZb4yosXBX5f5mrdUdnn00lc1luMLt`
);

// main function
function App() {
  //
  async function fetchProducts() {
    const respnse = await fetch("https://dummyjson.com/products");
    const data = await respnse.json();
    dispatch(setProducts({ products: [...items, ...data.products] }));
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  //
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser({ user: authUser?.email }));
      } else {
        dispatch(setUser({ user: null }));
      }
    });
  }, []);
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home products={[]} />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route
          path="/detail"
          element={
            <>
              <Header />
              <Detail />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
