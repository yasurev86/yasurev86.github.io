import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICatalogState {
	isOpened: boolean;
}

const initialState: ICatalogState = {
	isOpened: false,
};

export const CatalogSlice = createSlice({
	name: 'Catalog',
	initialState,
	reducers: {
		openCatalog(state, action: PayloadAction<undefined>) {
			state.isOpened = true;
		},
		closeCatalog(state, action: PayloadAction<undefined>) {
			state.isOpened = false;
		},
		toggleCatalog(state, action: PayloadAction<boolean>) {
			state.isOpened =
				action.payload !== undefined ? action.payload : !state.isOpened;
		},
	},
});

export const { reducer, actions } = CatalogSlice;
export * from './selector';
