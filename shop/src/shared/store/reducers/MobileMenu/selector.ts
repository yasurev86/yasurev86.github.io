import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorMobileMenu = (state: RootState) => state.MobileMenuReducer;
export const selectorMobileMenuIsOpened = createSelector(
	selectorMobileMenu,
	mobileMenu => mobileMenu.isOpened,
);
