import React from "react";
import Card from "../UI/Card";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <Card>
        <AvailableMeals />
      </Card>
    </React.Fragment>
  );
};

export default Meals;
