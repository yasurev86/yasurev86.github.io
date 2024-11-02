import axios from 'axios';
import { useAuth } from './useAuth';
import { i18n } from '@/shared/i18n';

export const useRegister = (
	onSuccess: (userData?: object) => void = () => {},
) => {
	const { handler, inputProps, data, setData } = useAuth<{
		name: string;
		surname: string;
		email: string;
		password: string;
	}>(
		{
			name: '',
			surname: '',
			email: '',
			password: '',
		},
		async (e, data, setErrors, setValidationErrors, setUserLogged) => {
			e.preventDefault();

			let valid = true;

			let emailError = '',
				passwordError = '';

			if (
				!data.email.match(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				)
			) {
				valid = false;
				emailError = i18n('incorrect_email');
			}

			if (data.password.length < 8) {
				valid = false;
				passwordError = i18n('short_password');
			}

			setValidationErrors(cur => ({
				...cur,
				email: emailError,
				password: passwordError,
			}));

			if (valid) {
				await axios
					.post(
						process.env.NEXT_PUBLIC_API_URL + 'auth/local/register',
						{
							username: data.email,
							name: data.name,
							surname: data.surname,
							email: data.email,
							password: data.password,
						},
						{
							withCredentials: true,
						},
					)
					.then(res => {
						if (res.status === 200) {
							setUserLogged(res.data.user.id);
							onSuccess(res.data);
						}
					})
					.catch(e => {
						setErrors(cur => ({
							...cur,
							email: i18n('user_already_exist'),
						}));
					});
			}
		},
	);

	return { handler, inputProps, data, setData };
};
