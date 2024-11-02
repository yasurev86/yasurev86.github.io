'use client';

import { FC, FormEvent, useState } from 'react';
import c from './RecoverPasswordModal.module.scss';
import Modal, { InputGroup, Suggestion } from '@/shared/ui/components/Modal';
import { Btn, Input } from '@/shared/ui/components';
import { loginModalName } from '@/features/modals';
import { useActions, useModal } from '@/shared/store/hooks';
import axios from 'axios';
import { i18n } from '@/shared/i18n';

type IProps = {};
const defaultData = {
	login: '',
	password: '',
	passwordConfirmation: '',
	code: '',
};
export const recoverPasswordModalName = 'recoverPassword';
const RecoverPasswordModal: FC<IProps> = () => {
	const { close } = useModal(recoverPasswordModalName);

	const { setUserLogged } = useActions();

	const [step, setStep] = useState<number>(1);

	const [error, setError] = useState('');
	const [validationErrors, setValidationErrors] = useState<{
		login: string;
		password: string;
		passwordConfirmation: string;
		code: string;
	}>(defaultData);
	const [data, setData] = useState({
		login: '',
		code: '',
		password: '',
		passwordConfirmation: '',
	});

	const prevStep = () => setStep(cur => Math.max(cur - 1, 1));

	const handleInit = async (e: FormEvent) => {
		e.preventDefault();

		let valid = true;

		let loginError = '';

		if (
			!data.login.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			)
		) {
			valid = false;
			loginError = i18n('incorrect_email');
		}

		setValidationErrors(cur => ({
			...cur,
			login: loginError,
		}));

		if (valid) {
			await axios
				.post(
					process.env.NEXT_PUBLIC_API_URL + 'auth/forgot-password',
					{
						email: data.login,
					},
				)
				.then(res => {
					if (res.status === 200) {
						setStep(2);
					}
				});
		}
	};

	const handleReset = async (e: FormEvent) => {
		e.preventDefault();

		let valid = true;

		let passwordError = '',
			passwordConfirmationError = '',
			codeError = '';

		if (!data.code) {
			valid = false;
			codeError = i18n('empty_code');
		}

		if (data.password.length < 8) {
			valid = false;
			passwordError = i18n('short_password');
		}

		if (data.password !== data.passwordConfirmation) {
			valid = false;
			passwordConfirmationError = i18n('passwords_not_match');
		}

		setValidationErrors(cur => ({
			...cur,
			password: passwordError,
			passwordConfirmation: passwordConfirmationError,
			code: codeError,
		}));

		if (valid) {
			await axios
				.post(process.env.NEXT_PUBLIC_API_URL + 'auth/reset-password', {
					password: data.password,
					passwordConfirmation: data.passwordConfirmation,
					code: data.code,
				})
				.then(res => {
					if (res.status === 200) {
						setUserLogged(res.data.user.id);
						close();
						setData(defaultData);
						setStep(1);
					}
				})
				.catch(({ response: res }) => {
					if (res.data.error.message == 'Incorrect code provided')
						setError(i18n('incorrect_code'));
				});
		}
	};

	return (
		<Modal
			caption={i18n('recover_password')}
			name={recoverPasswordModalName}
			className={c.modalInner}
		>
			{step === 1 && (
				<>
					<Input
						label={i18n('your_email')}
						value={data.login}
						onChange={e => {
							setValidationErrors(cur => ({ ...cur, login: '' }));
							setData(cur => ({ ...cur, login: e.target.value }));
						}}
						validationError={validationErrors.login}
					/>
					<Btn
						size={'large'}
						className={c.btn}
						fullWidth
						onClick={handleInit}
					>
						{i18n('send_code')}
					</Btn>
					<Suggestion
						btnText={i18n('i_remember_password')}
						modalName={loginModalName}
					/>
				</>
			)}
			{step === 2 && (
				<>
					<div className={c.codeSent}>
						{i18n('code_sent_to_email', data.login)}
					</div>
					<InputGroup>
						<Input
							placeholder={i18n('enter_code')}
							value={data.code}
							onChange={e => {
								setError('');
								setValidationErrors(cur => ({
									...cur,
									code: '',
								}));
								setData(cur => ({
									...cur,
									code: e.target.value,
								}));
							}}
							validationError={validationErrors.code}
							error={error}
						/>
						<Input
							placeholder={i18n('come_up_password')}
							value={data.password}
							onChange={e => {
								setValidationErrors(cur => ({
									...cur,
									password: '',
								}));
								setData(cur => ({
									...cur,
									password: e.target.value,
								}));
							}}
							validationError={validationErrors.password}
							isShowHide
						/>
						<Input
							placeholder={i18n('confirm_password')}
							value={data.passwordConfirmation}
							onChange={e => {
								setValidationErrors(cur => ({
									...cur,
									passwordConfirmation: '',
								}));
								setData(cur => ({
									...cur,
									passwordConfirmation: e.target.value,
								}));
							}}
							validationError={
								validationErrors.passwordConfirmation
							}
							isShowHide
						/>
					</InputGroup>
					<Btn
						size={'large'}
						className={c.btn}
						fullWidth
						onClick={handleReset}
					>
						{i18n('continue')}
					</Btn>
					<Suggestion
						btnText={i18n('return_back')}
						onClick={prevStep}
					/>
				</>
			)}
		</Modal>
	);
};

export default RecoverPasswordModal;
