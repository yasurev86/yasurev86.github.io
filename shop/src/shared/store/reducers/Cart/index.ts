import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const debugMode = false;

interface ICartState {
	items: {
		[key: number]: number;
	};
}

const initialState: ICartState = {
	items: {},
};

export const CartSlice = createSlice({
	name: 'Cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<number>) {
			debugMode && console.log('(addToCart)', action.payload);
			state.items[action.payload] = 1;
		},
		removeFromCart(state, action: PayloadAction<number>) {
			debugMode && console.log('(removeFromCart)', action.payload);
			delete state.items[action.payload];
		},
		setCartItemQuantity(
			state,
			action: PayloadAction<{ id: number; quantity: number }>,
		) {
			const { id, quantity } = action.payload;
			debugMode && console.log('(setCartItemQuantity)', { id, quantity });
			state.items[id] = quantity;
		},
	},
});

export const { reducer, actions } = CartSlice;
export * from './selectors';
