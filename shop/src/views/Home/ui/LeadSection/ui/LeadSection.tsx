'use client';

import React, { FC, AllHTMLAttributes, useContext } from 'react';
import c from './LeadSection.module.scss';
import clsx from 'clsx';
import Catalog, {
	OnlyCategoriesBlock,
	catalogModalName,
} from '@/shared/ui/components/Catalog';
import Slider, { ILeadSectionSlide } from './Slider/Slider';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { Btn } from '@/shared/ui/components';
import { useModal } from '@/shared/store/hooks';
import { getImagePath } from '@/shared/utils';
import { IProducer } from '@/entities/Producer';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

const MainContent: FC<IProps> = ({ slider, producers, ...props }) => {
	return (
		<div className={c.main}>
			<Slider items={slider} />
			{producers && (
				<div className={c.partners}>
					{producers.map(({ slug, logo }) => (
						<div key={slug}>
							<FullSizeLink href={`/catalog/?producer=${slug}`} />
							<img
								src={getImagePath(logo.data)}
								alt={'partner'}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

type IProps = {
	slider: ILeadSectionSlide[];
	producers: Pick<IProducer, 'slug' | 'logo'>[];
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;
const LeadSection: FC<IProps> = ({
	slider,
	producers,
	className,
	...props
}) => {
	const {
		max: { w1400: maw1400, w999: maw999 },
	} = useContext(MediaContext);

	const { open: openCatalogModal } = useModal(catalogModalName);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{maw1400 ? (
				<>
					<MainContent slider={slider} producers={producers} />
					{maw999 ? (
						<>
							<Btn
								icon={'menu'}
								className={c.catalogBtn}
								onClick={openCatalogModal}
							>
								{i18n('products_catalog')}
							</Btn>
							<Catalog className={c.catalog} />
						</>
					) : (
						<OnlyCategoriesBlock />
					)}
				</>
			) : (
				<Catalog className={c.catalog}>
					<MainContent slider={slider} producers={producers} />
				</Catalog>
			)}
		</div>
	);
};

export default LeadSection;
