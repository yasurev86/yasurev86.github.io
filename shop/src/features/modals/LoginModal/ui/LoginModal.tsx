'use client';

import { FC } from 'react';
import c from './LoginModal.module.scss';
import Modal, {
	Suggestion,
	InputGroup,
	BtnGroup,
} from '@/shared/ui/components/Modal';
import { Btn, Input, Checkbox } from '@/shared/ui/components';
import GoogleAuthBtn from '@/features/GoogleAuthBtn';
import { recoverPasswordModalName, registerModalName } from '@/features/modals';
import { useModal } from '@/shared/store/hooks';
import { useLogin } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const loginModalName = 'login';
const LoginModal: FC<IProps> = () => {
	const {
		[recoverPasswordModalName]: { open: openRecoverPasswordModal },
		close: closeModals,
	} = useModal([recoverPasswordModalName, loginModalName]);

	const {
		handler,
		inputProps,
		data: { rememberFlag },
	} = useLogin(() => {
		closeModals();
	});

	return (
		<Modal
			caption={i18n('login_modal_caption')}
			name={loginModalName}
			className={c.modalInner}
		>
			<form onSubmit={handler}>
				<InputGroup>
					<Input
						label={i18n('your_email')}
						{...inputProps('login')}
					/>
					<Input
						placeholder={i18n('enter_password')}
						isShowHide
						{...inputProps('password')}
					/>
				</InputGroup>
				<div className={c.actions}>
					<Checkbox {...inputProps('rememberFlag')}>
						{i18n('remember_me')}
					</Checkbox>
					<Btn
						use={'tertiary'}
						size={'medium'}
						onClick={openRecoverPasswordModal}
					>
						{i18n('recover_password')}
					</Btn>
				</div>
				<BtnGroup>
					<Btn size={'large'} fullWidth type={'submit'}>
						{i18n('login_modal_caption')}
					</Btn>
					<GoogleAuthBtn remember={rememberFlag} />
				</BtnGroup>
			</form>
			<Suggestion
				btnText={i18n('register')}
				modalName={registerModalName}
			>
				{i18n('not_register_yet')}
			</Suggestion>
		</Modal>
	);
};

export default LoginModal;
