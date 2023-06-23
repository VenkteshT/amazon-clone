import React from "react";
import "./detail.css";
const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

export default function Detail({ product }) {
  const { image, title, description, price, rating } = product;
  return (
    <div className="detail_container">
      <div className="product_title">{title}</div>
      <img src={image} alt={title} className="product_img" />
      <div className="product_description">{description}</div>
      <div className="product_rating">{ratings[Math.round(rating) - 1]}</div>
      <div className="product_price">{price}</div>
      <button className="add">Add to Cart</button>
    </div>
  );
}
