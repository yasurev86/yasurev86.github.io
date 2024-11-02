'use client';

import { FC, AllHTMLAttributes, useState, useEffect } from 'react';
import c from './AddressSelect.module.scss';
import clsx from 'clsx';
import { Input, Select, Checkbox } from '@/shared/ui/components';
import { useSearchStreetsQuery } from '@/entities/Location';
import { IDeliveryAddress } from '../../model/IDeliveryAddress';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorLocationCity } from '@/shared/store/reducers/Location';
import { i18n } from '@/shared/i18n';

type IProps = {
	data: IDeliveryAddress;
	setData: (data: (cur: IDeliveryAddress) => IDeliveryAddress) => void;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;
const AddressSelect: FC<IProps> = ({ data, setData, className, ...props }) => {
	const city = useAppSelector(selectorLocationCity);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');
	const [hasMore, setHasMore] = useState<boolean>(true);
	const { data: streetsData, isFetching } = useSearchStreetsQuery({
		city,
		query,
		page,
	});

	const [streets, setStreets] = useState<string[]>([]);

	useEffect(() => {
		if (search == '' || search !== data.street) {
			setQuery(search);
			setPage(1);
			setStreets([]);
		}
	}, [search, city]);

	useEffect(() => {
		if (
			!isFetching &&
			(query == '' || query !== data.street) &&
			streetsData
		) {
			setHasMore(streetsData.info.totalCount > 1);
			setStreets(cur => [
				...cur,
				...streetsData.data.map(({ Description }) => Description),
			]);
		}
	}, [streetsData]);

	return (
		<div className={className} {...props}>
			<div className={clsx('row', c.row)}>
				<Select
					placeholder={i18n('choose_street')}
					className={clsx('col_12', c.select)}
					isInput
					value={data.street}
					onChange={street => {
						setData(cur => ({
							...cur,
							street,
						}));
					}}
					inputValue={search}
					onInputChange={setSearch}
					items={streets}
					isLoading={isFetching}
					isInViewTriggerActive={hasMore}
					inViewTriggerCallback={isInView =>
						isInView && setPage(cur => cur + 1)
					}
				/>
			</div>
			<div className={clsx('row', c.row)}>
				<Input
					label={i18n('building')}
					className={'col_4'}
					value={data.building}
					onChange={e =>
						setData(cur => ({
							...cur,
							building: e.target.value.replace(
								/[^a-zA-Z0-9]/g,
								'',
							),
						}))
					}
				/>
				<Input
					label={i18n('flat')}
					className={'col_4'}
					value={data.flat}
					onChange={e =>
						setData(cur => ({
							...cur,
							flat: e.target.value.replace(/\D/g, ''),
						}))
					}
				/>
				<Input
					label={i18n('floor')}
					className={'col_4'}
					value={data.floor}
					onChange={e =>
						setData(cur => ({
							...cur,
							floor: e.target.value.replace(/\D/g, ''),
						}))
					}
				/>
			</div>
			<div className={clsx('row', c.row)}>
				<Checkbox
					value={data.hasElevator}
					setValue={hasElevator =>
						setData(cur => ({
							...cur,
							hasElevator,
						}))
					}
				>
					{i18n('elevator')}
				</Checkbox>
			</div>
		</div>
	);
};

export default AddressSelect;
