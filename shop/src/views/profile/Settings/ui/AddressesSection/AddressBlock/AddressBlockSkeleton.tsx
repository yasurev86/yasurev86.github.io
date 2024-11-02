import { FC } from 'react';
import c from './AddressBlock.module.scss';
import clsx from 'clsx';
import { Checkbox, Icon } from '@/shared/ui/components';
import Skeleton from 'react-loading-skeleton';

type IProps = {
	className?: string;
};
const AddressBlock: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Checkbox className={c.text}>
				<Skeleton />
			</Checkbox>
			<button className={c.deleteBtn}>
				<Icon name={'trash'} />
			</button>
		</div>
	);
};

export default AddressBlock;
