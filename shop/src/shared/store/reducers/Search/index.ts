import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
	isOpened: boolean;
}

const initialState: ISearchState = {
	isOpened: false,
};

export const SearchSlice = createSlice({
	name: 'Search',
	initialState,
	reducers: {
		openSearch(state, action: PayloadAction<undefined>) {
			state.isOpened = true;
		},
		closeSearch(state, action: PayloadAction<undefined>) {
			state.isOpened = false;
		},
		toggleSearch(state, action: PayloadAction<boolean>) {
			state.isOpened =
				action.payload !== undefined ? action.payload : !state.isOpened;
		},
	},
});

export const { reducer, actions } = SearchSlice;
export * from './selectors';
