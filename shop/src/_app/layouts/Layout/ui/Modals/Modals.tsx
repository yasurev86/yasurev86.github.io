'use client';

import React, { FC, AllHTMLAttributes, useEffect } from 'react';
import {
	CartModal,
	ChangePasswordModal,
	CompareListModal,
	DeleteAccountModal,
	LoginModal,
	RecoverPasswordModal,
	RegisterModal,
	ReplyModal,
	WriteReviewModal,
	ChangeAvatarModal,
} from '@/features/modals';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';
import { usePathname } from 'next/navigation';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Modals: FC<IProps> = ({ className, ...props }) => {
	const isLogged = useAppSelector(selectorUserIsLogged);

	const pathname = usePathname();
	const { closeModal } = useActions();

	useEffect(() => {
		closeModal();
	}, [pathname]);

	return (
		<>
			<CartModal />
			<CompareListModal />

			{isLogged ? (
				<>
					<ChangePasswordModal />
					<DeleteAccountModal />
					<ReplyModal />
					<WriteReviewModal />
					<ChangeAvatarModal />
				</>
			) : (
				<>
					<LoginModal />
					<RecoverPasswordModal />
					<RegisterModal />
				</>
			)}
		</>
	);
};

export default Modals;
