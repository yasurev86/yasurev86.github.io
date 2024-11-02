'use client';

import { FC, AllHTMLAttributes, useContext } from 'react';
import c from './MobileMenu.module.scss';
import clsx from 'clsx';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import NavItem from './NavItem/NavItem';
import SupportBlock from './SupportBlock/SupportBlock';
import InfoBlock from './InfoBlock/InfoBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import { INavItem } from './NavItem/INavItem';
import { Icon } from '@/shared/ui/components';
import { Scrollbar } from 'smooth-scrollbar-react';
import Link from 'next/link';
import { useFreezeScroll } from '@/shared/hooks';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';
import { selectorMobileMenuIsOpened } from '@/shared/store/reducers/MobileMenu';
import { i18n } from '@/shared/i18n';

const navItems: INavItem[] = [
	{
		name: i18n('my_orders'),
		isLoggedOnly: true,
		icon: 'box-search',
		link: '/profile/orders',
	},
	{
		name: i18n('favourites'),
		icon: 'heart',
		link: '/profile/favourites',
		count: 2,
	},
	{
		name: i18n('history'),
		isLoggedOnly: true,
		icon: 'history',
		link: '/profile/history',
	},
	{
		name: i18n('my_reviews'),
		isLoggedOnly: true,
		icon: 'review',
		link: '/profile/reviews',
	},
	{ name: i18n('cart'), icon: 'bag', link: '/cart' },
	{
		name: i18n('comparison'),
		icon: 'balance',
		link: '/comparison',
	},
];

type IProps = {
	isOpened?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const MobileMenu: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w1400: maw1400 },
	} = useContext(MediaContext);

	const isOpened = useAppSelector(selectorMobileMenuIsOpened);
	const { closeMobileMenu: closeMenu } = useActions();

	const { unfreezeScroll } = useFreezeScroll();

	const closeMobileMenu = () => {
		closeMenu();
		unfreezeScroll();
	};

	const isLogged = useAppSelector(selectorUserIsLogged);

	if (!maw1400) return;

	return (
		<div
			className={clsx(c.wrapper, isOpened && c._active, className)}
			{...props}
		>
			<div className={c.inner}>
				<Scrollbar continuousScrolling={false}>
					<div>
						<div className={c.scrollInner}>
							<div className={c.header}>
								<p className={c.caption}>{i18n('menu')}</p>
								<button
									className={c.close}
									onClick={closeMobileMenu}
								>
									<Icon name={'close-circle'} />
								</button>
							</div>
							<ProfileBlock
								isLogged={isLogged}
								className={
									isLogged
										? c['profile--logged']
										: c['profile--not-logged']
								}
							/>
							{navItems.map(
								data =>
									(isLogged || !data?.isLoggedOnly) && (
										<NavItem
											{...data}
											key={data.name}
											onClick={closeMobileMenu}
										/>
									),
							)}
							<hr />
							<p className={c.partCaption}>
								{i18n('information')}
							</p>
							<Link
								onClick={closeMobileMenu}
								href={'/warranty'}
								className={c.secondaryLink}
							>
								{i18n('guarantee')}
							</Link>
							<Link
								onClick={closeMobileMenu}
								href={'/refund'}
								className={c.secondaryLink}
							>
								{i18n('refund')}
							</Link>
							<Link
								onClick={closeMobileMenu}
								href={'/terms'}
								className={c.secondaryLink}
							>
								{i18n('terms_of_use')}
							</Link>
							<hr />
							<Link
								onClick={closeMobileMenu}
								className={c.link}
								href={'/about'}
							>
								{i18n('about_us')}
							</Link>
							<Link
								onClick={closeMobileMenu}
								className={c.link}
								href={'/delivery'}
							>
								{i18n('delivery_and_payment')}
							</Link>
							<Link
								onClick={closeMobileMenu}
								className={c.link}
								href={'/contacts'}
							>
								{i18n('contacts')}
							</Link>
							<hr />
							<InfoBlock name={i18n('physical_address')}>
								ул. Пушина, д. Колотушкина
							</InfoBlock>
							<InfoBlock name={i18n('schedule')}>
								Пн-Сб: 10:00 - 20:00
							</InfoBlock>
							<InfoBlock name={i18n('email')}>
								<a href="mailto:support@gmail.com">
									support@gmail.com
								</a>
							</InfoBlock>
							<SupportBlock className={c.support} />
						</div>
					</div>
				</Scrollbar>
			</div>
			<div className={c.overlay} onClick={closeMobileMenu}></div>
		</div>
	);
};

export default MobileMenu;
