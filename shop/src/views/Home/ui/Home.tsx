import React, { FC } from 'react';

const LazyProductsSection = dynamic(
	() => import('@/shared/ui/sections/ProductsSection'),
);
const LazyAdvantagesSection = dynamic(
	() => import('@/shared/ui/sections/AdvantagesSection'),
);
const LazyTextCollapseSection = dynamic(
	() => import('@/shared/ui/sections/TextCollapseSection'),
);
const LazyDiscountsSection = dynamic(() => import('./DiscountsSection'));
const LazyLeadSection = dynamic(() => import('./LeadSection'));

import { IHomePageComponents } from '@/app/page';
import { getLinkData } from '@/entities/Link';
import dynamic from 'next/dynamic';

const Home: FC<IHomePageComponents> = ({ blocks }) => {
	return (
		<>
			{blocks.map(el => {
				const { id, __component } = el;
				switch (__component) {
					case 'home.discounts-section': {
						const products = el.product_variants.data.map(
							({ id }) => id,
						);
						const categories = el.categories.data.map(
							({ id }) => id,
						);
						return (
							<LazyDiscountsSection
								key={__component + id}
								productIds={products}
								categoryIds={categories}
							/>
						);
					}
					case 'home.lead-section': {
						const producers = el.producers.data.map(
							({ attributes: { slug, logo } }) => ({
								slug,
								logo,
							}),
						);
						const slider = el.slider.map(({ link, ...rest }) => ({
							link: getLinkData(link),
							...rest,
						}));
						return (
							<LazyLeadSection
								key={__component + id}
								slider={slider}
								producers={producers}
							/>
						);
					}
					case 'shared.text-collapse-section': {
						return (
							<LazyTextCollapseSection
								key={__component + id}
								caption={el.caption || undefined}
								content={el.content}
							/>
						);
					}
					case 'shared.products-slider-section': {
						const ids = el.product_variants.data.map(
							({ id }) => id,
						);
						if (ids.length == 0) return null;
						return (
							<LazyProductsSection
								key={__component + id}
								caption={el.caption}
								ids={ids}
								link={getLinkData(el.link)}
							/>
						);
					}
					default:
						return null;
				}
			})}
			<LazyAdvantagesSection style={{ marginTop: 40 }} />
		</>
	);
};

export default Home;
