import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useAppDispatch } from '@/shared/store/hooks';

import { actions as MobileMenuActions } from '../reducers/MobileMenu';
import { actions as ModalsActions } from '../reducers/Modals';
import { actions as UserActions } from '../reducers/User';
import { actions as ComparisonActions } from '../reducers/Comparison';
import { actions as CartActions } from '../reducers/Cart';
import { actions as SearchActions } from '../reducers/Search';
import { actions as CatalogActions } from '../reducers/Catalog';
import { actions as ViewHistoryActions } from '../reducers/ViewHistory';
import { actions as SearchHistoryActions } from '../reducers/SearchHistory';
import { actions as LocationActions } from '../reducers/Location';

const rootActions = {
	...MobileMenuActions,
	...ModalsActions,
	...UserActions,
	...ComparisonActions,
	...CartActions,
	...SearchActions,
	...CatalogActions,
	...ViewHistoryActions,
	...SearchHistoryActions,
	...LocationActions,
};

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(
		() =>
			// @ts-ignore
			bindActionCreators(rootActions, dispatch) as {
				[key in keyof typeof rootActions]: (a?: any) => void;
			},
		[dispatch],
	);
};
