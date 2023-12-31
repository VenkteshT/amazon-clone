import React, { useState } from "react";
import style from "./subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// destructure classes

const { subtotal, subtotal_gift } = style;

// main function
export default function Subtotal() {
  //
  const { basket, user } = useSelector(stateSelector);

  //
  const getTotal = () => basket?.reduce((a, b) => a + b.price * b.qty, 0);

  //
  const navigate = useNavigate();

  //
  const handleProceedToCheckout = () => {
    if (user) {
      if (basket.length == 0) {
        toast.error(`basket is empty !`, { autoClose: 2000 });
        return;
      }
      navigate("/payment");
    } else {
      toast.error(`Please login to continue`, { autoClose: 2000 });
    }
  };
  // main function
  return (
    <div className={subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className={subtotal_gift}>
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotal()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$ "}
      />
      <button onClick={handleProceedToCheckout}>Proceed to checkout</button>
    </div>
  );
}
