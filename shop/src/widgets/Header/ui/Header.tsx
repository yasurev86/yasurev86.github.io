'use client';

import React, { FC, useContext, useEffect, useRef } from 'react';
import c from './Header.module.scss';

import Logo from '@/shared/assets/images/logos/logo.svg?icon';
import clsx from 'clsx';
import NavBtn from './NavBtn/NavBtn';
import HeaderSearch from '@/features/HeaderSearch';
import { Icon } from '@/shared/ui/components';
import Link from 'next/link';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { cartModalName } from '@/features/modals';
import Hamburger from './Hamburger/Hamburger';
import HeaderCatalog from './HeaderCatalog/HeaderCatalog';
import ProfileNavBtn from './ProfileNavBtn/ProfileNavBtn';
import FavouritesNavBtn from './FavouritesNavBtn/FavouritesNavBtn';
import ComparisonNavBtn from './ComparisonNavBtn/ComparisonNavBtn';
import CartNavBtn from './CartNavBtn/CartNavBtn';
import { useHeaderOverlay } from '@/widgets/Header/hooks/useHeaderOverlay';

type IProps = { phone?: string };
const Header: FC<IProps> = ({ phone }) => {
	const {
		max: { w1400: maw1400, w767: maw767 },
	} = useContext(MediaContext);

	const scrollHandler = () => {
		const wrapper = wrapperRef.current;

		if (!wrapper) return;

		wrapper.classList.toggle(
			c['_stuckon'],
			wrapper.getBoundingClientRect().top < 10,
		);
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { isOverlayActive, closeAll } = useHeaderOverlay();

	return (
		<div className={clsx(c.wrapper)} ref={wrapperRef}>
			<div className={clsx('content', c.inner)}>
				<Link href={'/'} className={c.logo}>
					<Logo />
				</Link>

				{maw767 ? (
					<HeaderSearch className={c.search} />
				) : (
					<div className={c.catalogPart}>
						<HeaderCatalog />
						<HeaderSearch className={c.search} />
					</div>
				)}
				{!maw1400 && (
					<a href={`tel:${phone}`} className={c.phone}>
						<Icon
							name={'phone'}
							style={{ marginRight: '.625em' }}
						/>
						{phone}
					</a>
				)}
				<div className={c.nav}>
					{!maw767 ? (
						<>
							<FavouritesNavBtn />
							<CartNavBtn />
							<ComparisonNavBtn />
							<ProfileNavBtn />
						</>
					) : (
						<NavBtn modal={cartModalName} icon={'bag'} />
					)}
					<Hamburger />
				</div>
			</div>
			<div
				onClick={closeAll}
				className={clsx(
					c.overlay,
					isOverlayActive && c['overlay--active'],
				)}
			></div>
		</div>
	);
};

export default Header;
