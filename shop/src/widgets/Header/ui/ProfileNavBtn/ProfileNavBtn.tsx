import React, { FC, AllHTMLAttributes } from 'react';
import NavBtn from '../NavBtn/NavBtn';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { loginModalName } from '@/features/modals';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const ProfileNavBtn: FC<IProps> = ({ className, ...props }) => {
	const isLogged = useAppSelector(selectorUserIsLogged);
	const { open: openLoginModal } = useModal(loginModalName);

	return (
		<NavBtn
			link={isLogged ? '/profile/orders' : undefined}
			icon={isLogged ? 'box-search' : 'profile'}
			onClick={!isLogged ? openLoginModal : undefined}
		/>
	);
};

export default ProfileNavBtn;
