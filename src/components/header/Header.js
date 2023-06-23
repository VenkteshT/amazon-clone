import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateSelector } from "../../redux/slice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
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
} = style;

// logo
const img_url = "http://pngimg.com/uploads/amazon/amazon_PNG11.png";

// main function
export default function Header() {
  const { basket, user } = useSelector(stateSelector);

  //
  const handleAuth = () => {
    if (user) {
      signOut(auth);
    }
  };
  return (
    <div className={header}>
      <Link to={"/"}>
        <img className={header_logo} src={img_url} alt="amazon" />
      </Link>

      <div className={header_search}>
        <input type="text" name="" id="" className={header_searchInput} />
        <SearchRoundedIcon className={header_serachIcon} />
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
