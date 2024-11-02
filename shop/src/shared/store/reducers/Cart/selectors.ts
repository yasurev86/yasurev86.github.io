import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorCart = (state: RootState) => state.CartReducer;
export const selectorCartItems = (state: RootState) =>
	selectorCart(state).items;
export const selectorCartItemsCount = createSelector(
	selectorCartItems,
	items => Object.keys(items).length,
);
