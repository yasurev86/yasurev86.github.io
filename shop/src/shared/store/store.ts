import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as MobileMenuReducer } from './reducers/MobileMenu';
import { reducer as ModalsReducer } from './reducers/Modals';
import { reducer as UserReducer } from './reducers/User';
import { reducer as ComparisonReducer } from './reducers/Comparison';
import { reducer as CartReducer } from './reducers/Cart';
import { reducer as SearchReducer } from './reducers/Search';
import { reducer as CatalogReducer } from './reducers/Catalog';
import { reducer as ViewHistoryReducer } from './reducers/ViewHistory';
import { reducer as SearchHistoryReducer } from './reducers/SearchHistory';
import { reducer as LocationReducer } from './reducers/Location';

import { productApi } from '@/entities/Product/';
import { categoryApi } from '@/entities/Category';
import { catalogSectionApi } from '@/entities/CatalogSection';
import { favouriteApi } from '@/entities/Favourite';
import { productNotificationApi } from '@/entities/ProductNotification';
import { userApi } from '@/entities/User';
import { searchApi } from '@/entities/Search';
import { reviewApi } from '@/entities/Review';
import { orderApi } from '@/entities/Order';
import { locationApi } from '@/entities/Location';

import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: [
		'CartReducer',
		'ComparisonReducer',
		'ViewHistoryReducer',
		'SearchHistoryReducer',
	],
};

const apis = [
	productApi,
	categoryApi,
	catalogSectionApi,
	favouriteApi,
	productNotificationApi,
	searchApi,
	userApi,
	reviewApi,
	orderApi,
	locationApi,
];

const rootReducer = combineReducers({
	MobileMenuReducer,
	ModalsReducer,
	UserReducer,
	ComparisonReducer,
	CartReducer,
	SearchReducer,
	CatalogReducer,
	ViewHistoryReducer,
	SearchHistoryReducer,
	LocationReducer,

	...Object.fromEntries(apis.map(api => [api.reducerPath, api.reducer])),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		// @ts-ignore
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
					],
				},
			}).concat(...apis.map(api => api.middleware)),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>['store'];
export type AppDispatch = AppStore['dispatch'];
