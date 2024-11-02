import { FC, AllHTMLAttributes, useContext } from 'react';
import c from '../UserBlock.module.scss';
import clsx from 'clsx';
import { Btn, Input, Checkbox } from '@/shared/ui/components';
import GoogleAuthBtn from '@/features/GoogleAuthBtn';
import { useModal } from '@/shared/store/hooks';
import { recoverPasswordModalName } from '@/features/modals';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useLogin } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const AuthForm: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	const { open: openRecoverPasswordModal } = useModal(
		recoverPasswordModalName,
	);

	const {
		inputProps,
		handler,
		data: { rememberFlag },
	} = useLogin();

	return (
		<form onSubmit={handler}>
			<div className={clsx('row', c.row)}>
				<Input
					label={i18n('email')}
					className={'col_6 col_428_12'}
					{...inputProps('login')}
				/>
				<Input
					label={i18n('enter_password')}
					className={'col_6 col_428_12'}
					{...inputProps('password')}
					isShowHide
				/>
			</div>
			<div className={clsx('row', c.row)}>
				<Btn
					className={'col_6 col_428_12'}
					size={maw767 ? 'medium' : 'large'}
					type={'submit'}
				>
					{i18n('login')}
				</Btn>
				<GoogleAuthBtn
					className={'col_6 col_428_12'}
					remember={rememberFlag}
				/>
			</div>
			<div className={clsx('row', c.row)}>
				<div
					className={'col_6 col_428_12'}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
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
			</div>
		</form>
	);
};

export default AuthForm;
