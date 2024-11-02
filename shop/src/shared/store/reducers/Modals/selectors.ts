import { RootState } from '@/shared/store/store';
import { createSelector } from 'reselect';

export const selectorModals = (state: RootState) => state.ModalsReducer;
export const selectorModalsActiveModal = createSelector(
	selectorModals,
	modals => modals.activeModal,
);

export const selectorModalsDataByKey = createSelector(
	[selectorModals, (state: RootState, key: string) => key],
	(modals, key) => modals.data[key],
);
