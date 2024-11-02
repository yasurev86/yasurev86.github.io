'use client';

import { FC, AllHTMLAttributes, useState, PropsWithChildren } from 'react';
import c from './Tabs.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';
const LazSpecificationsTable = dynamic(
	() => import('../SpecificationsTable/SpecificationsTable'),
);
import Tab from '../Tab/Tab';
const LazyReviews = dynamic(() => import('../Reviews/Reviews'));
import { Scrollbar } from 'smooth-scrollbar-react';
import { IStrapiMedia } from '@/shared/api';
import { getImagePath } from '@/shared/utils';
import { i18n } from '@/shared/i18n';
import dynamic from 'next/dynamic';

type IProps = {
	id: number;
	description: string;
	overview: IStrapiMedia<true>;
	properties: { id: number; name: string; value: string }[];
	reviews_count: number;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Tabs: FC<IProps> = ({
	id,
	overview,
	description,
	properties,
	className,
	reviews_count,
	...props
}) => {
	const [activeTab, setActiveTab] = useState(0);

	const TabBtn: FC<PropsWithChildren<{ id: number; count?: number }>> = ({
		id,
		count,
		children,
	}) => {
		return (
			<button
				onClick={() => setActiveTab(id)}
				className={activeTab == id ? c['active'] : undefined}
			>
				{children}
				{!!count && <span>{count}</span>}
			</button>
		);
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.selector}>
				<Scrollbar>
					<div>
						<div className={c.selectorContainer}>
							<TabBtn id={0}>{i18n('about_product')}</TabBtn>
							{overview.data && (
								<TabBtn id={1}>{i18n('overview')}</TabBtn>
							)}
							<TabBtn id={2}>{i18n('specifications')}</TabBtn>
							<TabBtn id={3} count={reviews_count}>
								{i18n('reviews')}
							</TabBtn>
						</div>
					</div>
				</Scrollbar>
			</div>
			<div className={c.container}>
				{overview.data && (
					<Tab caption={i18n('overview')} isActive={activeTab === 1}>
						{overview.data &&
							overview.data.map(item => (
								<picture key={item.id}>
									<source
										media={'(max-width: 999px)'}
										srcSet={getImagePath(item)}
									/>
									<img
										src={getImagePath(item)}
										alt=""
										loading="lazy"
									/>
								</picture>
							))}
					</Tab>
				)}
				<Tab caption={i18n('about_product')} isActive={activeTab === 0}>
					<div
						className={c.description}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</Tab>
				<Tab
					caption={i18n('specifications')}
					isActive={activeTab === 2}
					headerElem={
						<Btn icon={'download'} className={c.manualBtn}>
							{i18n('operating_instruction')}
						</Btn>
					}
				>
					<LazSpecificationsTable items={properties} />
				</Tab>
				<Tab caption={i18n('reviews')} isActive={activeTab === 3}>
					<LazyReviews id={id} />
				</Tab>
			</div>
		</div>
	);
};

export default Tabs;
