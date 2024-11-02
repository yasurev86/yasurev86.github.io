import axios from 'axios';
import { useAuth } from './useAuth';
import { i18n } from '@/shared/i18n';

export const useLogin = (onSuccess: (userData?: object) => void = () => {}) => {
	const { handler, inputProps, data, setData } = useAuth<{
		login: string;
		password: string;
		rememberFlag: boolean;
	}>(
		{
			login: '',
			password: '',
			rememberFlag: false,
		},
		async (e, data, setErrors, setValidationErrors, setUserLogged) => {
			e.preventDefault();

			let valid = true;

			let loginError = '',
				passwordError = '';

			if (
				!data.login.match(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				)
			) {
				valid = false;
				loginError = i18n('incorrect_email');
			}

			if (data.password.length < 8) {
				valid = false;
				passwordError = i18n('short_password');
			}

			setErrors(cur => ({ ...cur, email: '' }));
			setValidationErrors(cur => ({
				...cur,
				login: loginError,
				password: passwordError,
			}));

			if (valid) {
				await axios
					.post(
						process.env.NEXT_PUBLIC_API_URL + 'auth/local',
						{
							identifier: data.login,
							password: data.password,
							remember: data.rememberFlag,
						},
						{
							withCredentials: true,
						},
					)
					.then(res => {
						if (res.status === 200) {
							setUserLogged(res.data.userId);
							onSuccess(res.data);
						}
					})
					.catch(() => {
						setErrors(cur => ({
							...cur,
							email: i18n('user_not_found'),
						}));
					});
			}
		},
	);

	return { handler, inputProps, data, setData };
};
