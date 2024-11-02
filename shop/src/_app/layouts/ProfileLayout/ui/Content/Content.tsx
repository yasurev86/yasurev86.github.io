'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from '../ProfileLayout.module.scss';
import { Sidebar } from '../Sidebar';
import { usePathname } from 'next/navigation';
import { getActivePageData } from '../../utils/getActivePage';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { loginModalName } from '@/features/modals';
import { Btn } from '@/shared/ui/components';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Content: FC<IProps> = ({ className, children, ...props }) => {
	const pathname = usePathname();
	const activePageData = getActivePageData(pathname);

	const isLogged = useAppSelector(selectorUserIsLogged);
	const { open: openLoginModal } = useModal(loginModalName);

	if (!isLogged)
		return (
			<div className={c.loginContainer}>
				<h1>To access this page you need to log in.</h1>
				<Btn onClick={openLoginModal}>Login</Btn>
			</div>
		);

	return (
		<>
			<div className={c.sidebarContainer}>
				<Sidebar
					className={c.sidebar}
					activePage={activePageData.activePage}
				/>
			</div>
			<div className={c.main}>
				<h1 className={c.caption}>{activePageData.caption}</h1>
				{children}
			</div>
		</>
	);
};

export default Content;
