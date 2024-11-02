import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const allLocation = (state: RootState) => state.LocationReducer;
export const selectorLocation = createSelector(
	allLocation,
	location => location,
);
export const selectorLocationCity = createSelector(
	selectorLocation,
	location => location.city,
);
export const selectorLocationArea = createSelector(
	selectorLocation,
	location => location.area,
);
export const selectorLocationRef = createSelector(
	selectorLocation,
	location => location.ref,
);
