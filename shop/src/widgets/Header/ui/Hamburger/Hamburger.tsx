'use client';

import React, { FC, AllHTMLAttributes, useContext } from 'react';
import NavBtn from '../NavBtn/NavBtn';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useActions } from '@/shared/store/hooks';
import { useFreezeScroll } from '@/shared/hooks';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Hamburger: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w1400: maw1400 },
	} = useContext(MediaContext);

	const { openMobileMenu: openMenu } = useActions();
	const { freezeScroll } = useFreezeScroll();

	const openMobileMenu = () => {
		openMenu();
		freezeScroll();
	};

	if (maw1400) return <NavBtn icon={'hamburger'} onClick={openMobileMenu} />;
	else return;
};

export default Hamburger;
