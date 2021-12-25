import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [];
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoadig, setIsLoadig] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://demofoods-be1a2-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      const data = await res.json();
      const fetchedMeals = [];
      for (let key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setIsLoadig(false);
      setMeals(fetchedMeals)
    };
    fetchMeals().catch((err) => {
      setHasFetchError(true);
      setIsLoadig(false);
    });;
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

  if(hasFetchError){
    return (
      <section className={classes.hasError}>
        <p>No data found</p>
      </section>
    )
  }
  if (isLoadig) {
    return (
      <section className={classes.loading}>
        <p>Loading.....</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
