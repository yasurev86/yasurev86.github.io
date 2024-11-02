import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const debugMode = false;

interface IComparisonState {
	items: { [categoryId: number]: number[] };
}

const initialState: IComparisonState = {
	items: {},
};

export const ComparisonSlice = createSlice({
	name: 'Comparison',
	initialState,
	reducers: {
		addToComparison(
			state,
			action: PayloadAction<{ id: number; categories: number[] }>,
		) {
			const { id, categories } = action.payload;
			debugMode && console.log('(addToComparison)', { id, categories });
			categories.forEach(category => {
				if (category in state.items) {
					state.items[category].push(id);
				} else {
					state.items[category] = [id];
				}
			});
		},
		removeFromComparison(state, action: PayloadAction<number>) {
			const id = action.payload;
			debugMode && console.log('(removeFromComparison)', id);
			Object.keys(state.items)
				.map(Number)
				.forEach(category => {
					if (state.items[category].indexOf(id) != -1) {
						if (state.items[category].length == 1)
							delete state.items[category];
						else
							state.items[category] = state.items[
								category
							].filter(el => el !== id);
					}
				});
		},
		removeComparisonCategory(state, action: PayloadAction<number>) {
			const id = action.payload;
			debugMode && console.log('(removeComparisonCategory)', id);
			if (id in state.items) {
				delete state.items[id];
			}
		},
	},
});

export const { reducer, actions } = ComparisonSlice;
export * from './selectors';
