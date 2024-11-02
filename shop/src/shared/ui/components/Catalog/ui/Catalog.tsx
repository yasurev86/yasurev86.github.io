'use client';

import { FC, AllHTMLAttributes, useState, useContext } from 'react';
import c from './Catalog.module.scss';

import { MediaContext } from '@/_app/providers/MediaProvider';
import { Modal } from '@/shared/ui/components';
import { useGetCatalogSectionQuery } from '@/entities/CatalogSection';
import CatalogContentSkeleton from './Content/ContentSkeleton';
import Content from './Content/Content';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

export type CatalogProps = {
	isFirstSelected?: boolean;
	close?: () => void;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;

export const catalogModalName = 'catalog';
const Catalog: FC<CatalogProps> = ({ isFirstSelected = false, ...props }) => {
	const {
		max: { w1400: maw1400 },
	} = useContext(MediaContext);

	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		isFirstSelected ? 0 : null,
	);

	const { data, isLoading } = useGetCatalogSectionQuery(undefined);

	if (!isLoading && !data) return null;

	if (maw1400) {
		return (
			<Modal
				caption={
					(selectedCategory &&
						data &&
						data[selectedCategory].category.name) ||
					i18n('catalog')
				}
				fullscreen
				name={catalogModalName}
				className={c.catalogModalInner}
			>
				<ConditionalLoadingBlock
					isLoading={isLoading}
					data={data}
					fallback={<CatalogContentSkeleton {...props} />}
					content={data => (
						<Content
							data={data}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							suppressHydrationWarning
							{...props}
						/>
					)}
					emptyResult={null}
				/>
			</Modal>
		);
	}

	return (
		<ConditionalLoadingBlock
			isLoading={isLoading}
			data={data}
			fallback={<CatalogContentSkeleton {...props} />}
			content={data => (
				<Content
					data={data}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					isFirstSelected={isFirstSelected}
					{...props}
				/>
			)}
			emptyResult={null}
		/>
	);
};

export default Catalog;
