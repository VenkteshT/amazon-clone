import React from "react";
import style from "./checkout.module.css";
import Subtotal from "../subtotal/Subtotal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "../../redux/slice";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
// destructure classes
const { checkout, checkout_left, checkout_ad, checkout_title } = style;

// img url
const img_url = `https://images-na.ssl-images-amazon.
com/images/G/02/UK_CCMP/TM/OCC_Amazon1.
_CB423492668_.jpg`;

// main function
export default function Checkout() {
  const { basket, user } = useSelector(stateSelector);
  return (
    <div className={checkout}>
      <div className={checkout_left}>
        <img src={img_url} alt="" className={checkout_ad} />

        <div className={checkout_title}>
          <h5>Hello, {user ? user : "Guest"}</h5>
          <h2 className="checkout_title">Your shopping Basket</h2>

          {basket.map((item, i) => (
            <CheckoutProduct
              key={item.id}
              index={i}
              qty={item.qty}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checout_right">
        <Subtotal />
      </div>
    </div>
  );
}
