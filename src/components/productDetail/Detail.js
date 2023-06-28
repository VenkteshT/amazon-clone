import React, { useEffect } from "react";
import "./detail.css";
import { stateSelector } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../redux/slice";
const { addToBasket } = actions;
const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
let lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
export default function Detail() {
  const { itemDetails } = useSelector(stateSelector);
  const { id, title, image, description, rating, price } = itemDetails;

  const dispatch = useDispatch();
  //
  const handleClick = () => {
    let item = {
      id,
      title,
      price,
      image,
      rating,
    };
    dispatch(addToBasket({ item }));
  };
  //
  const navigate = useNavigate();
  //
  useEffect(() => {
    if (!title) navigate("/");
  }, []);

  return (
    <div className="detail_container">
      <h1 className="product_title">{title}</h1>
      <img src={image} alt={title} className="product_img" />
      <div className="product_rating">{ratings[Math.round(rating) - 1]}</div>
      <div className="product_description">{description || lorem}</div>
      <div className="product_price">$ {price}</div>
      <button className="add" onClick={handleClick}>
        Add to Cart
      </button>
    </div>
  );
}
