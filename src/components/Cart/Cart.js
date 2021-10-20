import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const handleCartItemAdd = (item) => {
        try {
            cartCtx.addItem({ ...item, amount: 1 });
        } catch (e) {
            console.log("error in handleCartItemAdd", e.stack)
        }
    };

    const handleCartItemRemove = (id) => {
        try {
            cartCtx.removeItem(id);
        } catch (e) {
            console.log("error in handleCartItemRemove", e.stack)
        }
    };

    const handleOrder = (event) => {
        try {
            setShowCheckout(true);
        } catch (e) {
            console.log("error in handleOrder", e.stack)
        }
    }

    const submitOrderData = async (userData) => {
        try {
            setIsSubmitting(true);
            const resp = await fetch('https://react-http-aafdf-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                }), // string or object
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (resp.statusText === 'OK') {
                setIsSubmitting(false);
                setDidSubmit(true);
                cartCtx.clearCart();
            }
        } catch (e) {
            console.log("error in submitOrderData", e.stack)
        }
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((each) => {
        return (<CartItem key={each.id} name={each.name} amount={each.amount} price={each.price} onAdd={handleCartItemAdd.bind(null, each)} onRemove={handleCartItemRemove.bind(null, each.id)} />);
    })}</ul>;

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmt}</span>
            </div>
            {showCheckout ? <Checkout onCancel={props.onClose} onSendData={submitOrderData} /> :
                <div className={classes.actions}>
                    <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                    {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
                </div>
            }
        </React.Fragment>
    );

    const sendingModalContent = <p>Sending order data...</p>;
    const dataSent = (
        <React.Fragment>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>OK</button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal clickedClose={props.onClose}>
            {isSubmitting ? sendingModalContent : (didSubmit ? dataSent : cartModalContent)}
        </Modal>
    );
}

export default Cart;