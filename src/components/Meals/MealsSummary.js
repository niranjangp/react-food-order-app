import classes from './MealsSummary.module.css';

const MealsSummary = (props) => {
    return (
        <section className={classes.summary}>
            <h2>Delicious Digital Food, Delivered To You</h2>
            <p>Choose your favorite digital meal from our broad selection of available digital meals and enjoy a delicious virtual lunch or dinner at home.</p>
            <p>All our digital meals are cooked with high-quality ingredients, just-in-time and of course by experienced code-chefs!</p>
        </section>
    )
};

export default MealsSummary;