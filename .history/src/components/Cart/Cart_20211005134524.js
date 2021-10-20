import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
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

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((each) => {
        return (<CartItem key={each.id} name={each.name} amount={each.amount} price={each.price} onAdd={handleCartItemAdd.bind(null, each.item)} onRemove={handleCartItemRemove.bind(null, each.id)} />);
    })}</ul>;

    return (
        <Modal clickedClose={props.onClose}>{cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmt}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;