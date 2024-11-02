import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const debugMode = false;

interface IModalsState {
	activeModal: string | undefined;
	data: any;
}

const initialState: IModalsState = {
	activeModal: undefined,
	data: undefined,
};

export const ModalsSlice = createSlice({
	name: 'Modals',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<{ name: string; data?: any }>) {
			debugMode && console.log('(openModal)', action.payload);
			const { name, data } = action.payload;
			state.activeModal = name;
			state.data = data;
		},
		closeModal(state, action: PayloadAction<undefined>) {
			debugMode && console.log('(closeModal)', action.payload);
			state.activeModal = undefined;
			state.data = undefined;
		},
		toggleModal(state, action: PayloadAction<string>) {
			debugMode && console.log('(toggleModal)', action.payload);
			state.activeModal =
				state.activeModal !== undefined ? undefined : action.payload;
		},
	},
});

export const { reducer, actions } = ModalsSlice;
export * from './selectors';
