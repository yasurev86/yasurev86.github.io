'use client';

import { FC } from 'react';
import c from './CompareListModal.module.scss';
import { Modal, Icon, ConditionalLoadingBlock } from '@/shared/ui/components';
import { useActions, useAppSelector, useModal } from '@/shared/store/hooks';
import { ICategory, useGetCategoriesQuery } from '@/entities/Category';
import {
	selectorComparisonCategories,
	selectorComparisonCategoriesAndCounts,
} from '@/shared/store/reducers/Comparison';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = {};
export const compareListModalName = 'compareList';
const CompareListModal: FC<IProps> = () => {
	const comparisonCategories = useAppSelector(selectorComparisonCategories);
	const comparisonCategoriesCounts = useAppSelector(
		selectorComparisonCategoriesAndCounts,
	);
	const categoriesCount = comparisonCategories.length;

	const { removeComparisonCategory } = useActions();
	const { data: categories, isLoading } = useGetCategoriesQuery(
		{
			ids: comparisonCategories,
		},
		{
			skip: !comparisonCategories || !categoriesCount,
		},
	);
	const { close } = useModal(compareListModalName);

	return (
		<Modal
			caption={i18n('comparison')}
			subcaption={
				!!comparisonCategoriesCounts.length
					? i18n('choose_comparison_category')
					: undefined
			}
			name={compareListModalName}
			className={c.modalInner}
		>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				isEmpty={comparisonCategoriesCounts && !categoriesCount}
				data={categories}
				content={(categories: ICategory[]) =>
					categories.map(({ id, name, slug }) => (
						<div className={c.item} key={id}>
							<p
								className={c.name}
								title={
									name + ': ' + comparisonCategoriesCounts[id]
								}
							>
								<FullSizeLink
									href={`/comparison/${slug}`}
									onClick={close}
								/>
								<span>{name}</span>{' '}
								<span className={c.count}>
									{comparisonCategoriesCounts[id]}
								</span>
							</p>
							<button
								className={c.deleteBtn}
								onClick={() => removeComparisonCategory(id)}
							>
								<Icon name={'trash'} />
							</button>
						</div>
					))
				}
				emptyResult={
					<div className={c.empty}>
						<Icon name={'balance'} className={c.emptyIcon} />
						<p>{i18n('comparison_products_not_found')}</p>
						<span>{i18n('empty_compare_list_subcaption')}</span>
					</div>
				}
			/>
		</Modal>
	);
};

export default CompareListModal;
