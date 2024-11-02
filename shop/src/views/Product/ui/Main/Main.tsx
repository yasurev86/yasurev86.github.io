'use client';

import React, { FC, useRef, ComponentProps, useEffect } from 'react';
import c from './Main.module.scss';
import { Rating } from '@/entities/Product';
import { ColorPicker, Price, Breadcrumbs } from '@/shared/ui/components';
import Availability from '../Availability/Availability';
import Slider from '../Slider/Slider';
import ActionBtns from '../ActionBtns/ActionBtns';
import FloatingPanel from '../FloatingPanel/FloatingPanel';
import { IProduct } from '@/entities/Product';
import { useActions } from '@/shared/store/hooks';
import { getCategoriesIds } from '../../lib/getCategoriesIds';
import { i18n } from '@/shared/i18n';

type IProps = {
	data: IProduct;
	breadcrumbs: ComponentProps<typeof Breadcrumbs>['items'];
};
const Main: FC<IProps> = ({ breadcrumbs, data }) => {
	const { addToViewHistory } = useActions();

	useEffect(() => {
		addToViewHistory(data.id);
	}, []);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const categoriesIds = getCategoriesIds(data.categories);

	return (
		<>
			<div className={c.wrapper} ref={wrapperRef}>
				<Slider
					className={c.slider}
					// @ts-ignore
					items={data.slider}
				/>
				<div className={c.info}>
					<div className={c.codeContainer}>
						<Breadcrumbs
							className={c.breadcrumbs}
							items={breadcrumbs}
						/>
						<p className={c.code}>{data.code}</p>
					</div>
					<p className={c.name}>{data.name}</p>
					<Rating
						rating={data.rating}
						reviewsCount={data.reviews_count}
					/>
					<Price
						className={c.price}
						price={data.price}
						oldPrice={data.oldPrice}
						discount={data.discount}
						actualPriceClassName={c.actualPrice}
						oldPriceClassName={c.oldPrice}
						discountClassName={c.discount}
						variant={'all-in-row'}
					/>
					<Availability availability={data.availability} />
					{!!data.colors.length && (
						<div className={c.colorPicker}>
							<p className={c.colorPicker_caption}>
								{i18n('choose_color')}
							</p>
							<ColorPicker
								className={c.colorPicker_element}
								colors={data.colors}
								isFirstInitialChecked={false}
								initialChecked={data.color}
							/>
						</div>
					)}
					<ActionBtns
						className={c.btns}
						availability={data.availability}
						id={data.id}
						categories={categoriesIds}
					/>
					<div className={c.features}>
						{Array.from({ length: 5 }).map((_, ind) => (
							<img
								key={ind}
								src={`/assets/images/product-images/features/${ind + 1}.png`}
								alt={'feature'}
							/>
						))}
					</div>
				</div>
			</div>
			<FloatingPanel
				trigger={wrapperRef}
				categories={categoriesIds}
				{...data}
			/>
		</>
	);
};

export default Main;
