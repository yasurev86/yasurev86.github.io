import { useActions } from '@/shared/store/hooks';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { userApi } from '@/entities/User/api/userApi';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
	const { setUserUnlogged } = useActions();

	const dispatch = useDispatch();

	const { push } = useRouter();

	return async () => {
		const res = await axios('/api/auth/logout');

		if (res.data.success) {
			setUserUnlogged();
			dispatch(userApi.util?.invalidateTags(['user']));
			push('/');
		}
	};
};
