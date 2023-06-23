import React from "react";
import style from "./checoutProduct.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/slice";
const { removeFromBasket, increaseQuantity, decreaseQuantity } = actions;
const {
  checkoutProduct,
  checkoutProduct_image,
  checkoutProduct_info,
  checkoutProduct_title,
  checkoutProduct_price,
  checkoutProduct_rating,
  checkoutProduct_Qty,
  add,
  btn,
  remove,
} = style;

// ratings
const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

// main function
export default function CheckoutProduct({
  id,
  index,
  image,
  title,
  price,
  rating,
  order,
  qty,
}) {
  rating = rating > 5 ? 5 : rating;

  const dispatch = useDispatch();
  //
  const decreseQty = (id) => dispatch(decreaseQuantity({ id }));

  //
  const increaseQty = (id) => dispatch(increaseQuantity({ id }));

  // handle click
  const handleClick = (id, index) => dispatch(removeFromBasket({ id, index }));
  return (
    <div className={checkoutProduct}>
      <img src={image} alt="product_img" className={checkoutProduct_image} />

      <div className={checkoutProduct_info}>
        <p className={checkoutProduct_title}>{title}</p>
        <p className={checkoutProduct_price}>
          <small>$ </small>
          <strong>{price}</strong>
        </p>
        <div className={checkoutProduct_rating}>
          {ratings[Math.round(rating) - 1]}
        </div>

        <div className={checkoutProduct_Qty}>
          {!order && (
            <button
              className={`${remove} ${btn}`}
              onClick={() => decreseQty(id)}
            >
              -
            </button>
          )}
          <span>{order ? "qty: " + qty : qty}</span>
          {!order && (
            <button className={`${add} ${btn}`} onClick={() => increaseQty(id)}>
              +
            </button>
          )}
        </div>

        {!order && (
          <button onClick={() => handleClick(id, index)} className={btn}>
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  );
}
