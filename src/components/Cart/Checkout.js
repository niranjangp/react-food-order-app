import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        zip: true
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const zipRef = useRef();


    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            const nameVal = nameRef.current.value;
            const streetVal = streetRef.current.value;
            const cityVal = cityRef.current.value;
            const zipVal = zipRef.current.value;

            const nameValid = !isEmpty(nameVal);
            const streetValid = !isEmpty(streetVal);
            const cityValid = !isEmpty(cityVal);
            const zipValid = isFiveChars(zipVal);

            setFormValidity({
                name: nameValid,
                street: streetValid,
                city: cityValid,
                zip: zipValid
            });

            const formValid = nameValid && streetValid && cityValid && zipValid;
            if (formValid) {
                props.onSendData({
                    name: nameVal,
                    street: streetVal,
                    city: cityVal,
                    zip: zipVal
                });
            }

        } catch (e) {
            console.log('Error in handleSubmit ', e.stack);
        }
    }



    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Type Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="street">Address - Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={`${classes.control} ${formValidity.zip ? '' : classes.invalid}`}>
                <label htmlFor="zip">Zip Code</label>
                <input type='text' id='zip' ref={zipRef} />
                {!formValidity.zip && <p>Please enter a valid zip code(5 characteres long)!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
