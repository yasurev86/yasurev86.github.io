'use client';

import { FC } from 'react';
import c from './RegisterModal.module.scss';
import Modal, {
	InputGroup,
	BtnGroup,
	Suggestion,
} from '@/shared/ui/components/Modal';
import { Btn, Input } from '@/shared/ui/components';
import GoogleAuthBtn from '@/features/GoogleAuthBtn';
import Link from 'next/link';
import { loginModalName } from '@/features/modals';
import { useModal } from '@/shared/store/hooks';
import { useRouter } from 'next/navigation';
import { i18n } from '@/shared/i18n';
import { useRegister } from '@/entities/User';

type IProps = {};
export const registerModalName = 'register';
const RegisterModal: FC<IProps> = () => {
	const { push } = useRouter();
	const { close: closeModals } = useModal([]);

	const { handler, inputProps, data } = useRegister(() => {
		closeModals();
	});

	return (
		<Modal
			caption={i18n('register_modal_caption')}
			name={registerModalName}
			className={c.modalInner}
		>
			<form onSubmit={handler}>
				<InputGroup>
					<Input label={i18n('name')} {...inputProps('name')} />
					<Input
						placeholder={i18n('surname')}
						{...inputProps('surname')}
					/>
					<Input
						placeholder={i18n('email')}
						{...inputProps('email')}
					/>
					<Input
						placeholder={i18n('come_up_password')}
						isShowHide
						{...inputProps('password')}
					/>
				</InputGroup>
				{/* Need translate */}
				<p className={c.policy}>
					Регистрируясь, вы соглашаетесь с{' '}
					<Link href={'/terms'} target={'_blank'}>
						условиями положения о сборе и защите персональных данных
					</Link>{' '}
					и{' '}
					<Link href={'/terms'} target={'_blank'}>
						пользовательским соглашением
					</Link>
				</p>
				<BtnGroup>
					<Btn size={'large'} fullWidth type={'submit'}>
						{i18n('register')}
					</Btn>
					<GoogleAuthBtn remember={true} />
				</BtnGroup>
			</form>
			<Suggestion btnText={'Войти'} modalName={loginModalName}>
				{i18n('already_register')}
			</Suggestion>
		</Modal>
	);
};

export default RegisterModal;
