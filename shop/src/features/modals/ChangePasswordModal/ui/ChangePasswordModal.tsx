'use client';

import { FC, FormEvent, useState } from 'react';
import c from './ChangePasswordModal.module.scss';
import Modal, { InputGroup, Suggestion } from '@/shared/ui/components/Modal';
import { Btn, Input } from '@/shared/ui/components';
import { useActions, useModal } from '@/shared/store/hooks';
import axios from 'axios';
import { useGetUserDataQuery } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {};
const defaultData = {
	code: '',
	password: '',
	passwordConfirmation: '',
};
export const changePasswordModalName = 'changePassword';
const ChangePasswordModal: FC<IProps> = () => {
	const { close } = useModal(changePasswordModalName);

	const { data: userData, isFetching: isUserDataFetching } =
		useGetUserDataQuery(undefined);
	const login = userData?.email;

	const { setUserLogged } = useActions();

	const [step, setStep] = useState<number>(1);

	const [error, setError] = useState('');
	const [validationErrors, setValidationErrors] = useState<{
		password: string;
		passwordConfirmation: string;
		code: string;
	}>({
		password: '',
		passwordConfirmation: '',
		code: '',
	});
	const [data, setData] = useState(defaultData);

	const prevStep = () => setStep(cur => Math.max(cur - 1, 1));

	const handleInit = async (e: FormEvent) => {
		e.preventDefault();

		let valid = true;

		let passwordError = '',
			passwordConfirmationError = '';

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
		}));

		if (valid) {
			await axios
				.post(
					process.env.NEXT_PUBLIC_API_URL + 'auth/forgot-password',
					{
						email: login,
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

		let codeError = '';

		if (!data.code) {
			valid = false;
			codeError = i18n('empty_code');
		}
		setValidationErrors(cur => ({
			...cur,
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
			caption={i18n('change_password_modal_caption')}
			name={changePasswordModalName}
			className={c.modalInner}
		>
			{step === 1 && (
				<>
					<InputGroup>
						<Input
							placeholder={i18n('enter_new_password')}
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
							placeholder={i18n('new_password_one_more')}
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
						onClick={handleInit}
					>
						{i18n('send_code')}
					</Btn>
				</>
			)}
			{step === 2 && (
				<>
					<div className={c.codeSent}>
						{i18n('code_sent_to_email', login)}
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

export default ChangePasswordModal;
