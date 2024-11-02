import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
	isLogged: boolean;
	id?: number;
}

const initialState: IUserState = {
	isLogged: false,
	id: undefined,
};

export const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		setUserLogged(state, action: PayloadAction<number>) {
			state.isLogged = true;
			state.id = action.payload;
		},
		setUserUnlogged(state) {
			state.isLogged = false;
			state.id = undefined;
		},
		toggleUserLogged(state, action: PayloadAction<number | undefined>) {
			if (!state.isLogged) state.id = action.payload;
			state.isLogged = !state.isLogged;
		},
	},
});

export const { reducer, actions } = UserSlice;
export * from './selectors';
