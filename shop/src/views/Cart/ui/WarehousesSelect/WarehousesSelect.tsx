'use client';

import { FC, AllHTMLAttributes, useState, useEffect } from 'react';
import { Select } from '@/shared/ui/components';
import { useAppSelector } from '@/shared/store/hooks';
import { useGetWarehousesQuery } from '@/entities/Location';
import { selectorLocationCity } from '@/shared/store/reducers/Location';
import { i18n } from '@/shared/i18n';

type IProps = {
	data: string;
	setData: (pickupAddress: string) => void;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;
const WarehousesSelect: FC<IProps> = ({
	data,
	setData,
	className,
	...props
}) => {
	const city = useAppSelector(selectorLocationCity);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const { data: warehousesData, isFetching } = useGetWarehousesQuery({
		city,
		page,
	});

	const [warehouses, setWarehouses] = useState<string[]>([]);

	useEffect(() => {
		setPage(1);
		setWarehouses([]);
	}, [city]);

	useEffect(() => {
		if (!isFetching && warehousesData) {
			setHasMore(warehousesData.info.totalCount > 1);
			setWarehouses(cur => [
				...cur,
				...warehousesData.data.map(({ Description }) => Description),
			]);
		}
	}, [warehousesData]);

	return (
		<Select
			placeholder={i18n('choose_warehouse_or_locker')}
			value={data}
			onChange={data => setData(data)}
			items={warehouses}
			isLoading={isFetching}
			isInViewTriggerActive={hasMore}
			inViewTriggerCallback={isInView => {
				if (isInView) {
					setPage(cur => cur + 1);
				}
			}}
		/>
	);
};

export default WarehousesSelect;
