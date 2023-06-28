import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "../../redux/slice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { actions } from "../../redux/slice";
import defaultProducts from "../../products";

// icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const { searchItem, setItem } = actions;

// destructing classes from style object
const {
  header,
  header_logo,
  header_search,
  header_nav,
  header_searchInput,
  header_option,
  header_optionLineOne,
  header_optionLineTwo,
  header_serachIcon,
  header_optionBasket,
  header_basketCount,
  searching_items,
} = style;

// logo
const img_url = "http://pngimg.com/uploads/amazon/amazon_PNG11.png";

// main function
export default function Header() {
  const { products, basket, user, searchableItem } = useSelector(stateSelector);
  const [searchingItems, setSearchingItems] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  //
  useEffect(() => {
    setItems([...products, ...defaultProducts]);
  }, []);

  //
  const dispatch = useDispatch();

  //
  const navigate = useNavigate();
  //
  const has = (str) => {
    return str.toLowerCase().includes(searchableItem.toLowerCase());
  };
  //
  useEffect(() => {
    if (!searchableItem) {
      setSearchingItems([]);
      return;
    } else {
      setSearchingItems([
        ...defaultProducts.filter((el) => has(el.title)),
        ...products.filter((el) => has(el.title)),
      ]);
    }
  }, [searchableItem]);

  const handleAuth = () => {
    if (user) {
      signOut(auth);
    }
  };
  //
  const handleSearch = () => {
    setSearchingItems([]);
    let item = items.find((el) => el.id == id);
    console.log(item);
    item = {
      ...item,
      image: item.image || item.images[0],
    };
    dispatch(setItem({ item }));
    navigate("/detail");
  };

  //
  return (
    <div className={header}>
      <Link to={"/"}>
        <img className={header_logo} src={img_url} alt="amazon" />
      </Link>

      <div className={header_search}>
        <input
          type="text"
          name=""
          id=""
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            dispatch(searchItem({ data: e.target.value }));
          }}
          className={header_searchInput}
        />
        <span onClick={handleSearch}>
          <SearchRoundedIcon className={header_serachIcon} />
        </span>

        {searchingItems.length ? (
          <div className={searching_items}>
            {searchingItems.map((el) => (
              <p
                key={el.id}
                value={el.title}
                onClick={() => {
                  setValue(el.title);
                  setId(el.id);
                  setSearchingItems([]);
                }}
              >
                {el.title}
              </p>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={header_nav}>
        <Link to={user ? "/" : "/login"}>
          <div onClick={handleAuth} className={header_option}>
            <span className={header_optionLineOne}>
              Hello {user ? user.slice(0, 6) : "Guest"}
            </span>
            <span className={header_optionLineTwo}>
              {user ? "Sign-out" : "Sign-in"}
            </span>
          </div>
        </Link>

        <Link to={"/orders"}>
          <div className={header_option}>
            <span className={header_optionLineOne}>Returns</span>
            <span className={header_optionLineTwo}>& Orders</span>
          </div>
        </Link>

        <div className={header_option}>
          <span className={header_optionLineOne}>Your</span>
          <span className={header_optionLineTwo}>Prime</span>
        </div>

        <Link to={"/checkout"}>
          <div className={header_optionBasket}>
            <ShoppingBasketIcon />
            <span className={`${header_optionLineTwo} ${header_basketCount}`}>
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
