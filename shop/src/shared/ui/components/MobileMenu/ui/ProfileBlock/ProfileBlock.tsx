'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './ProfileBlock.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';
import { UserCard } from '@/entities/User';
import { useActions, useModal } from '@/shared/store/hooks';
import { loginModalName } from '@/features/modals';
import { i18n } from '@/shared/i18n';

type IProps = { isLogged: boolean } & AllHTMLAttributes<HTMLDivElement>;
const ProfileBlock: FC<IProps> = ({ isLogged, className, ...props }) => {
	const { closeMobileMenu } = useActions();
	const { open: openLoginModal } = useModal(loginModalName);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{isLogged ? (
				<UserCard exitBtn />
			) : (
				<>
					<Btn
						use={'secondary'}
						size={'medium'}
						icon={'profile'}
						className={c.loginBtn}
						onClick={() => {
							openLoginModal();
							closeMobileMenu();
						}}
					>
						{i18n('login_personal_account')}
					</Btn>
				</>
			)}
		</div>
	);
};

export default ProfileBlock;
