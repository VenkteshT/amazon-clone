import React from "react";
import { useSelector } from "react-redux";
import { stateSelector } from "../../redux/slice";
import "./orders.css";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
export default function Orders() {
  const { orders, user } = useSelector(stateSelector);
  if (!user) {
    return (
      <div className="order_container">
        <h2>please login to see you orders</h2>
      </div>
    );
  }
  return (
    <div className="order_container">
      <h2>your orders </h2>
      <div className="orders">
        {orders.map((item) => {
          return (
            <CheckoutProduct
              order={true}
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image || item.images[0]}
              price={item.price}
              rating={item.rating}
              qty={item.qty}
            />
          );
        })}
      </div>
    </div>
  );
}
