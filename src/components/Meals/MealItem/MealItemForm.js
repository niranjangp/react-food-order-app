import { useState, useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const enteredAmount = amountInputRef.current.value;
            const enteredAmountNumber = +enteredAmount;
            if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
                setAmountIsValid(false);
                return;
            }
            props.onAddToCart(enteredAmountNumber);
        } catch (e) {
            console.log('Error in handleSubmit', e.stack);
        }
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Input ref={amountInputRef} inputLabel="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;