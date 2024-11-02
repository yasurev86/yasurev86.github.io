import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILocationState {
	ref: string;
	city: string;
	area: string;
}

const initialState: ILocationState = {
	ref: '',
	city: 'Москва',
	area: 'Московская',
};

export const LocationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setLocation(state, action: PayloadAction<ILocationState>) {
			Object.assign(state, action.payload);
		},
	},
});

export const { reducer, actions } = LocationSlice;
export * from './selector';
