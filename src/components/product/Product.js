import React, { useState } from "react";
import style from "./product.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/slice";
import { Link, useNavigate } from "react-router-dom";
const { addToBasket, setItem } = actions;
// destructre classess from style object
const { product, product_info, product_price, product_rating, product_title } =
  style;

// rating
const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

// main function
export default function Product({
  id,
  title,
  price,
  image,
  rating,
  description,
}) {
  //
  rating = rating > 5 ? 5 : rating;
  const [adding, setAdding] = useState(false);
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const itemDetail = () => {
    let item = {
      id,
      title,
      price,
      image,
      rating,
      description,
    };
    dispatch(setItem({ item }));
    navigate("/detail");
  };
  //
  const handleClick = () => {
    setAdding(true);
    let item = {
      id,
      title,
      price,
      image,
      rating,
    };
    dispatch(addToBasket({ item }));
    setAdding(false);
  };
  return (
    <div className={product}>
      <div className={product_info}>
        <p className={product_title}>{title}</p>

        <p className={product_price}>
          <small>$</small>
          <strong> {price}</strong>
        </p>

        <div className={product_rating}>
          <p>{ratings[Math.round(rating) - 1]}</p>
        </div>
      </div>

      <img src={image} alt="" onClick={itemDetail} />

      <button onClick={handleClick} disabled={!adding ? false : true}>
        Add to Basket
      </button>
    </div>
  );
}
