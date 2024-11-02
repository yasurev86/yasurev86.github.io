import { FC, AllHTMLAttributes } from 'react';
import c from './LocationBlock.module.scss';
import clsx from 'clsx';
import SwapBlock from '../SwapBlock/SwapBlock';
import { useAppSelector } from '@/shared/store/hooks';
import { selectorLocation } from '@/shared/store/reducers/Location';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const LocationBlock: FC<IProps> = ({ className, ...props }) => {
	const { city, area } = useAppSelector(selectorLocation);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<SwapBlock
				icon={'location'}
				name={city}
				description={area ? i18n('n_area', area) : ''}
				onClick={undefined}
			/>
		</div>
	);
};

export default LocationBlock;
