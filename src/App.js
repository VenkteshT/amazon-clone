import "./App.css";
import Checkout from "./components/checkout/Checkout";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "./redux/slice";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { actions } from "./redux/slice";
import { useDispatch } from "react-redux";
import Payment from "./components/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/orders/Orders";
import { ToastContainer } from "react-toastify";
const { setUser } = actions;

const promise = loadStripe(
  `pk_test_51NM0iQSGOqRmeIbnFHCBqAQFXkplhQC8buvwvRvy7S3OAcOfjHOZSIrnMMkzO9m2GGvzXZb4yosXBX5f5mrdUdnn00lc1luMLt`
);

// main function
function App() {
  //
  const state = useSelector(stateSelector);

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const respnse = await fetch("https://dummyjson.com/products");
    const data = await respnse.json();
    setProducts([...data.products]);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  //
  const navigate = useNavigate();
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home products={products} />
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
