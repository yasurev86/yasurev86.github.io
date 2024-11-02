import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorSearch = (state: RootState) => state.SearchReducer;
export const selectorSearchIsOpened = createSelector(
	selectorSearch,
	search => search.isOpened,
);
