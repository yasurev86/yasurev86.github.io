'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './DiscountsSection.module.scss';
import clsx from 'clsx';
import Slider from './Slider/Slider';
import Block from './Block/Block';
import { IProduct, useGetProductsQuery } from '@/entities/Product';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import { ICategory, useGetCategoriesQuery } from '@/entities/Category';
import { getImagePath } from '@/shared/utils';
import SliderSkeleton from './Slider/SliderSkeleton';
import BlockSkeleton from './Block/BlockSkeleton';
import { i18n } from '@/shared/i18n';

type IProps = {
	productIds: number[];
	categoryIds: number[];
} & AllHTMLAttributes<HTMLDivElement>;
const DiscountsSection: FC<IProps> = ({
	productIds,
	categoryIds,
	className,
	...props
}) => {
	const {
		data: products,
		error: productsError,
		isLoading: isProductsLoading,
	} = useGetProductsQuery({ ids: productIds });
	const {
		data: categories,
		error: categoriesError,
		isLoading: isCategoriesLoading,
	} = useGetCategoriesQuery({ ids: categoryIds, detailed: true });

	return (
		<>
			{/* TODO: fix */}
			<section
				className={clsx(c.wrapper, className)}
				{...props}
				suppressHydrationWarning
			>
				<ConditionalLoadingBlock
					isLoading={isProductsLoading}
					data={products?.data}
					fallback={<SliderSkeleton />}
					content={(items: IProduct[]) => <Slider items={items} />}
					emptyResult={<>Нет товаров...</>}
				/>
				<div className={c.blocks}>
					<ConditionalLoadingBlock
						isLoading={isCategoriesLoading}
						data={
							categories
								? [...categories].sort(
										(a, b) =>
											categoryIds.indexOf(a.id) -
											categoryIds.indexOf(b.id),
									)
								: categories
						}
						fallback={Array.from({ length: 6 }).map((_, ind) => (
							<BlockSkeleton key={ind} />
						))}
						content={(items: ICategory[]) =>
							items &&
							items.map(({ id, image, name, slug }) => (
								<Block
									key={id}
									link={`/catalog/${slug}`}
									caption={name}
									image={getImagePath(image.data)}
								/>
							))
						}
						emptyResult={<>{i18n('categories_not_found')}</>}
					/>
				</div>
			</section>
		</>
	);
};

export default DiscountsSection;
