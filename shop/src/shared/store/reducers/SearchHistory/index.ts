import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchHistoryState {
	items: number[];
}

const initialState: ISearchHistoryState = {
	items: [],
};

export const SearchHistorySlice = createSlice({
	name: 'SearchHistory',
	initialState,
	reducers: {
		addToSearchHistory(state, action: PayloadAction<number>) {
			const id = action.payload;

			if (state.items.indexOf(id) == -1) {
				state.items.push(id);
			} else {
				state.items = [id, ...state.items.filter(el => el !== id)];
			}
		},
		removeFromSearchHistory(state, action: PayloadAction<number>) {
			const id = action.payload;

			state.items = state.items.filter(el => el !== id);
		},
	},
});

export const { reducer, actions } = SearchHistorySlice;
export * from './selectors';
