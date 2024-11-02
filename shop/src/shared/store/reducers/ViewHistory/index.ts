import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IViewHistoryState {
	items: number[];
}

const initialState: IViewHistoryState = {
	items: [],
};

export const ViewHistorySlice = createSlice({
	name: 'ViewHistory',
	initialState,
	reducers: {
		addToViewHistory(state, action: PayloadAction<number>) {
			const id = action.payload;

			if (state.items.indexOf(id) == -1) {
				state.items.push(id);
			} else {
				state.items = [id, ...state.items.filter(el => el !== id)];
			}
		},
	},
});

export const { reducer, actions } = ViewHistorySlice;
export * from './selector';
