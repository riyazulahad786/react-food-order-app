import classes from "./MealsSummary.module.css";

// Static component for displaying the summary of the restaurant
const MealsSummary = () => {
  return (
    // Alternate - section tag
    // Alternate - use <p> tags instead of <br>
    <div className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      Choose your favorite meal from our broad selection of available meals and
      enjoy a delicion lunch or dinner at home.
      <br />
      <br />
      All our meals are cooked with high-quality ingredients, just-in-time and
      of course by experiences chefs!!
    </div>
  );
};

export default MealsSummary;
