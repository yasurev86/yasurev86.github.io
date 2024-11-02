'use client';

import { useActions } from '@/shared/store/hooks';

import { FC, PropsWithChildren, useEffect } from 'react';
import { getUserId } from '../api/getUserId';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { setUserLogged } = useActions();

	useEffect(() => {
		(async () => {
			const id = await getUserId();

			if (id) {
				setUserLogged(id);
			}
		})();
	}, []);

	return <>{children}</>;
};

export default AuthProvider;
