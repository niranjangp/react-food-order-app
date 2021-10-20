import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    try {
        if (action.type === 'ADD') {
            const updTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];
            let updItems;

            if (existingCartItem) {
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

        if (action.type === 'REMOVE') {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingItem = state.items[existingCartItemIndex];
            const updTotalAmount = state.totalAmount - existingItem.price;
            let updItems;
            if (existingItem.amount === 1) {
                updItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updItem = { ...existingItem, amount: existingItem.amount - 1 };
                updItems = [...state.items];
                updItems[existingCartItemIndex] = updItem;
            }
            return {
                items: updItems,
                totalAmount: updTotalAmount
            };
        }

        return defaultCartState;
    } catch (e) {
        console.log('Error in cartReducer', e.stack);
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const handleAddItemToCart = (item) => {
        try {
            dispatchCartAction({ type: 'ADD', item: item })
        } catch (e) {
            console.log('Error in handleAddItemToCart', e.stack);
        }
    }

    const handleRemoveItemFromCart = (id) => {
        try {
            dispatchCartAction({ type: 'REMOVE', id: id })
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