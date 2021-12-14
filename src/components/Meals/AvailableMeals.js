import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  let [loadingMeals, setLoadingMeals] = useState(true);
  let [loadingError, setLoadingError] = useState();
  let [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-3810e-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      return responseData;
    };

    fetchMeals()
      .then((data) => {
        let FETCHED_MEALS = Object.keys(data).map((key) => {
          return {
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          };
        });
        setMeals(FETCHED_MEALS);
      })
      .catch((e) => {
        setLoadingError(e.message);
      });
    setLoadingMeals(false);
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <div className={classes.meals}>
      <Card>
        {loadingError && <p>{loadingError}</p>}
        {!loadingMeals && <ul>{mealsList}</ul>}
        {loadingMeals && <p>Fetching meals from server...</p>}
      </Card>
    </div>
  );
};

export default AvailableMeals;
