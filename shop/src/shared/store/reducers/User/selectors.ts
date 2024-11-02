import { RootState } from '@/shared/store/store';

export const selectorUser = (state: RootState) => state.UserReducer;
export const selectorUserId = (state: RootState) => selectorUser(state).id;
export const selectorUserIsLogged = (state: RootState) =>
	selectorUser(state).isLogged;
