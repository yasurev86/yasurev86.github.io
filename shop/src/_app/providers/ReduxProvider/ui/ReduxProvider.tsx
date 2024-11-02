'use client';

import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '@/shared/store/store';
import { PersistGate } from 'redux-persist/integration/react';
const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
	const { store, persistor } = setupStore();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
