import React from "react";

import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <div className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onCartClick={props.onCartClick}>
          Your Cart
        </HeaderCartButton>
      </div>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table full of food." />
      </div>
    </React.Fragment>
  );
};

export default Header;
