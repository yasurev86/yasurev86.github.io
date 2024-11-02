'use client';

import React, { FC, AllHTMLAttributes, useContext } from 'react';
import c from './HeaderCatalog.module.scss';
import clsx from 'clsx';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useActions, useAppSelector, useModal } from '@/shared/store/hooks';
import { catalogModalName } from '@/shared/ui/components/Catalog';
import { Btn, Catalog } from '@/shared/ui/components';
import { selectorCatalogIsOpened } from '@/shared/store/reducers/Catalog';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const HeaderCatalog: FC<IProps> = ({ className, ...props }) => {
	const { open: openCatalogModal } = useModal(catalogModalName);
	const { toggleCatalog, closeCatalog } = useActions();

	const isOpened = useAppSelector(selectorCatalogIsOpened);

	const {
		max: { w1400: maw1400, w999: maw999 },
	} = useContext(MediaContext);

	const toggleCatalogMerged = () =>
		maw1400 ? openCatalogModal() : toggleCatalog();

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Btn
				icon={'menu'}
				onClick={toggleCatalogMerged}
				size={maw999 ? 'small' : 'normal'}
				className={c.catalogBtn}
			>
				{i18n('catalog')}
			</Btn>
			{maw1400 ? (
				<Catalog className={c.catalog} />
			) : (
				<Catalog
					className={clsx(
						c.catalog,
						isOpened && c['catalog--opened'],
					)}
					close={closeCatalog}
					isFirstSelected
				/>
			)}
		</div>
	);
};

export default HeaderCatalog;
