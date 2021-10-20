import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            //const response = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/meals.json');
            const response = await fetch('https://react-food-order-ab2e8-default-rtdb.firebaseio.com/meals.json');
            console.log("resp is ", response);
            if (response.statusText !== 'OK') {
                //setHttpError('Error: Failed to load data from server!!!');
                throw new Error("Something went wrong!");
            } else {
                const myJSON = await response.json();
                console.log("myJSON is ", myJSON);
                const loadedMeals = [];
                for (const key in myJSON) {
                    loadedMeals.push({
                        id: key,
                        name: myJSON[key].name,
                        description: myJSON[key].description,
                        price: myJSON[key].price,
                    });
                }
                console.log("loadedmeal is ", loadedMeals);
                setMeals(loadedMeals);
                setIsLoading(false);
            }
        }
        /* a function which returns a promise which has a reject scenario can be caught using the catch and executing the error scenario as depicted below */
        fetchMeals().catch((e) => {
            setIsLoading(false);
            setHttpError(e.message);
        });
    }, []);

    const mealsList = meals.map((meal) => {
        return (
            <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id} />
        );
    })

    return (
        <section className={classes.meals}>
            <Card>
                {isLoading ? <p className={classes.mealsLoading}>Loading...</p> : (httpError ? <p className={classes.mealsError}>{httpError}</p> : <ul>{mealsList}</ul>)}
            </Card>
        </section>
    )
};

export default AvailableMeals;