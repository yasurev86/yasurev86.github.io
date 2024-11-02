import { FC, AllHTMLAttributes } from 'react';
import c from './OnlyCategoriesBlock.module.scss';
import clsx from 'clsx';

import Category from '../Category/Category';
import { useModal } from '@/shared/store/hooks';
import { catalogModalName } from '../Catalog';
import {
	ICatalogSection,
	useGetCatalogSectionQuery,
} from '@/entities/CatalogSection';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import CategorySkeleton from '../Category/CategorySkeleton';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const OnlyCategoriesBlock: FC<IProps> = ({ className, ...props }) => {
	const { open: openCatalogModal } = useModal(catalogModalName);
	const { data, isLoading } = useGetCatalogSectionQuery(undefined);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={data}
				fallback={Array.from({ length: 12 }).map(el => (
					<CategorySkeleton />
				))}
				content={(items: ICatalogSection) =>
					items.map(({ category, id }) => (
						<Category
							name={category.name}
							icon={category.icon}
							className={c.category}
							key={id}
							onClick={openCatalogModal}
						/>
					))
				}
				emptyResult={<>{i18n('categories_not_found')}</>}
			/>
		</div>
	);
};

export default OnlyCategoriesBlock;
