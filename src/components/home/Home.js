import React from "react";
import style from "./home.module.css";
import Product from "../product/Product";
import {
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
} from "../../products";
const { home, home_container, home_img, home_row, home_products } = style;

// img url
const bg_img = `https://images-eu.ssl-images-amazon.
com/images/G/02/digital/video/merch2016/
Hero/Covid19/Generic/
GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x
600_PV_en-GB._CB428684220_.jpg`;

// main function
export default function Home({ products }) {
  return (
    <div className={home}>
      <div className={home_container}>
        <img src={bg_img} alt="img" className={home_img} />

        <div className={home_row}>
          <Product
            id={product1.id}
            title={product1.title}
            image={product1.image}
            price={product1.price}
            rating={product1.rating}
          />
          <Product
            id={product2.id}
            title={product2.title}
            image={product2.image}
            price={product2.price}
            rating={product2.rating}
          />
        </div>

        <div className={home_row}>
          <Product
            id={product3.id}
            title={product3.title}
            image={product3.image}
            price={product3.price}
            rating={product3.rating}
          />
          <Product
            id={product4.id}
            title={product4.title}
            image={product4.image}
            price={product4.price}
            rating={product4.rating}
          />
          <Product
            id={product5.id}
            title={product5.title}
            image={product5.image}
            price={product5.price}
            rating={product5.rating}
          />
        </div>

        <div className={home_row}>
          <Product
            id={product6.id}
            title={product6.title}
            image={product6.image}
            price={product6.price}
            rating={product6.rating}
          />
        </div>

        <div className={home_products}>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
                image={product.images[0]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
