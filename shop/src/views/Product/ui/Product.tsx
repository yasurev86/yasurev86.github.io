import React, { FC } from 'react';
import c from './Product.module.scss';
import { Breadcrumbs } from '@/shared/ui/components';
import Tabs from './Tabs/Tabs';
import Main from './Main/Main';
import { RecentlySection } from '@/shared/ui/sections';
import { IFullProductData } from '../model/IFullProductData';
import { getBreadcrumbs } from '../lib/getBreadcrumbs';

type IProps = {
	slug: string;
	data: IFullProductData;
};
const Product: FC<IProps> = ({ slug, data, ...props }) => {
	const breadcrumbs = getBreadcrumbs(data);
	return (
		<div className={c.wrapper} {...props}>
			<Breadcrumbs className={c.breadcrumbs} items={breadcrumbs} />
			<Main data={data} breadcrumbs={breadcrumbs} />
			<Tabs
				id={data.id}
				description={data.description}
				overview={data.overview}
				properties={data.properties}
				reviews_count={data.reviews_count}
			/>
			<RecentlySection />
		</div>
	);
};

export default Product;
