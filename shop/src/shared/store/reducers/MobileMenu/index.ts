import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMobileMenuState {
	isOpened: boolean;
}

const initialState: IMobileMenuState = {
	isOpened: false,
};

export const MobileMenuSlice = createSlice({
	name: 'MobileMenu',
	initialState,
	reducers: {
		openMobileMenu(state, action: PayloadAction<undefined>) {
			state.isOpened = true;
		},
		closeMobileMenu(state, action: PayloadAction<undefined>) {
			state.isOpened = false;
		},
		toggleMobileMenu(state, action: PayloadAction<undefined>) {
			state.isOpened = !state.isOpened;
		},
	},
});

export const { reducer, actions } = MobileMenuSlice;
export * from './selector';
