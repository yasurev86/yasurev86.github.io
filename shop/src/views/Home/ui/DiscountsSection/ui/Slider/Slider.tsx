'use client';

import React, { FC, AllHTMLAttributes, useState, useContext } from 'react';
import c from './Slider.module.scss';
import clsx from 'clsx';
import { IProduct } from '@/entities/Product';
import { MediaContext } from '@/_app/providers/MediaProvider';
import Link from 'next/link';
import { Btn, Price } from '@/shared/ui/components';
import { getImagePath } from '@/shared/utils';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {
	items: IProduct[];
} & AllHTMLAttributes<HTMLDivElement>;
const Slider: FC<IProps> = ({ items, className, ...props }) => {
	const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

	const currentSlide = items ? items[currentSlideNumber] : undefined;

	const handlePrev = () => setCurrentSlideNumber(cur => Math.max(0, cur - 1));
	const handleNext = () =>
		setCurrentSlideNumber(cur => Math.min(items.length - 1, cur + 1));

	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	if (!currentSlide)
		return (
			<div className={clsx(c.wrapper, className)} {...props}>
				{i18n('catalog_products_not_found')}
			</div>
		);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.label}>{i18n('products_with_discount')}</div>
			{maw767 && (
				<div className={c.image}>
					<img
						src={getImagePath(currentSlide.image)}
						alt=""
						loading="lazy"
					/>
				</div>
			)}
			<Link href={`/product/${currentSlide.slug}`} className={c.name}>
				{currentSlide.name}
			</Link>
			<p className={c.promoDuration}>
				<span>{i18n('promo_valid_until')}:</span> 14.11
			</p>
			<div className={c.container}>
				<div className={c.productInfo}>
					<Price
						className={c.price}
						oldPrice={currentSlide.oldPrice}
						oldPriceClassName={c.oldPrice}
						discount={currentSlide.discount}
						discountClassName={c.discount}
						price={currentSlide.price}
						actualPriceClassName={c.actualPrice}
						variant={'group_actualPrice-and-discount'}
					/>
					<Btn
						icon={'bag'}
						size={maw767 ? 'medium' : 'large'}
						className={c.cartBtn}
					>
						{i18n('buy')}
					</Btn>
					<div className={c.nav}>
						<Btn
							use={'secondary'}
							icon={'arrow-left'}
							onClick={handlePrev}
						/>
						<span className={c.dots}>
							{Array.from({ length: items.length }, (_, ind) => (
								<span
									key={ind}
									className={
										ind == currentSlideNumber
											? c.active
											: undefined
									}
								></span>
							))}
						</span>
						<Btn
							use={'secondary'}
							icon={'arrow-right'}
							onClick={handleNext}
						/>
					</div>
				</div>
				{!maw767 && (
					<div className={c.image}>
						<FullSizeLink href={`/product/${currentSlide.slug}`} />
						<img
							src={getImagePath(currentSlide.image)}
							alt=""
							loading="lazy"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Slider;
