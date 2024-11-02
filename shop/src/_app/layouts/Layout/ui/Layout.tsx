import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@/widgets';
import { Footer } from '@/shared/ui/layout';
import { PreHeader, MobileMenu } from '@/shared/ui/components';
import Modals from './Modals/Modals';
import { Toaster } from 'react-hot-toast';
import c from './Layout.module.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={c.wrapper}>
			<PreHeader />
			<Header />
			<MobileMenu />
			<main className={c.main}>
				<div className="content">{children}</div>
			</main>
			<Footer />
			<Modals />
			<Toaster
				position={'bottom-right'}
				containerStyle={{ top: 'var(--header-height)' }}
			/>
		</div>
	);
};

export default Layout;
