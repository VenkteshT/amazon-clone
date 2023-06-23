import React, { useEffect, useState } from "react";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slice";
import { stateSelector } from "../../redux/slice";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";

const { clearBasket } = actions;
export default function Payment() {
  //
  const { user, basket } = useSelector(stateSelector);

  //
  const dispatch = useDispatch();
  //
  const navigate = useNavigate();

  //
  const getTotal = (basket) => basket.reduce((a, b) => a + b.price * b.qty, 0);
  //
  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [err, setErr] = useState(null);
  const [disable, setDisable] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  //
  const stripe = useStripe();
  const elements = useElements();

  //
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        `/payments/create?total=${getTotal(basket) * 100}`
      );
      setClientSecret(response.data.data);
    };
    getClientSecret();
  }, [basket]);

  console.log(`THE Secet is:>>>`, clientSecret);
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // const payload = await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     console.log("success");
    //   });
    dispatch(clearBasket());
    setSucceded(true);
    setErr(null);
    setProcessing(false);
    navigate("/orders");
  };

  //
  const handleChange = (e) => {
    setDisable(e.empty);
    setErr(e.error ? e.error.message : "");
  };

  //
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to={"/checkout"}>{basket.length} items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and devivery </h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                qty={item.qty}
                image={item.image || item.image[0]}
              />
            ))}
          </div>
        </div>

        {/* Payment section-Payment method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$ "
                />
                <button disabled={processing || disable || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* error */}
              {err && <div>{err}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
