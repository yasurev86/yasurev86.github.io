import { FC, Dispatch, SetStateAction } from 'react';
import c from '../Catalog.module.scss';
import clsx from 'clsx';
import { ICatalogSection } from '@/entities/CatalogSection';
import { useModal } from '@/shared/store/hooks';
import Category from '../Category/Category';
import { Btn } from '@/shared/ui/components';
import Block from '../Block/Block';
import { getImagePath } from '@/shared/utils';
import { CatalogProps } from '@/shared/ui/components/Catalog';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = CatalogProps & {
	data: ICatalogSection;
	selectedCategory: number | null;
	setSelectedCategory: Dispatch<SetStateAction<number | null>>;
};
const Content: FC<IProps> = ({
	children,
	data,
	isFirstSelected,
	close,
	className,
	selectedCategory,
	setSelectedCategory,
	...props
}) => {
	const { close: closeModal } = useModal('catalog');

	const currentPart =
		selectedCategory != null ? data[selectedCategory] : null;

	const closeAll = () => {
		close && close();
		closeModal();
	};

	return (
		<div
			className={clsx(c.wrapper, className)}
			{...props}
			onMouseLeave={() =>
				!isFirstSelected ? setSelectedCategory(null) : undefined
			}
		>
			<div
				className={clsx(
					c.categories,
					currentPart && c['categories--active'],
				)}
			>
				{data.map(({ category: { id, name, slug, icon } }, ind) => (
					<Category
						name={name}
						icon={icon}
						onMouseEnter={() => setSelectedCategory(ind)}
						isSelected={selectedCategory == ind}
						key={id}
					/>
				))}
			</div>
			<div className={c.filler}>{children}</div>
			{currentPart && (
				<div
					className={clsx(
						c.products,
						!currentPart.banner && c['products--no-banner'],
					)}
				>
					<Btn
						icon={'arrow-left'}
						use={'secondary'}
						size={'medium'}
						onClick={() => setSelectedCategory(null)}
						className={c.backBtn}
					>
						{i18n('all_categories')}
					</Btn>
					<div className={c.blocks}>
						{currentPart.blocks.map(
							({ id, caption_category, products }) => (
								<Block
									products={products}
									className={c.block}
									caption={caption_category}
									onLinkClick={closeAll}
									key={id}
								/>
							),
						)}
					</div>
					{currentPart.banner && (
						<div className={c.banner} onClick={closeAll}>
							<FullSizeLink href={currentPart.banner.link} />
							<img
								src={getImagePath(
									currentPart.banner.image.data,
								)}
								loading="lazy"
								alt={''}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Content;
