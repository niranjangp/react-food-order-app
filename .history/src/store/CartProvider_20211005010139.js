import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updItems;

        if(existingCartItem) {
            const updItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updItems = [...state.items];
            updItems[existingCartItemIndex] = updItem;
        } else {
            updItems = state.items.concat(action.item);
        }
        
        return {
            items: updItems,
            totalAmount: updTotalAmount
        }
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const handleAddItemToCart = (item) => {
        try {
            dispatchCartAction({type: 'ADD', item: item})
        } catch (e) {
            console.log('Error in handleAddItemToCart', e.stack);
        } 
    }

    const handleRemoveItemFromCart = (id) => {
        try {
            dispatchCartAction({type: 'REMOVE', id: id})
        } catch (e) {
            console.log('Error in handleAddItemToCart', e.stack);
        } 
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCart

    };

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    );
};

export default CartProvider;