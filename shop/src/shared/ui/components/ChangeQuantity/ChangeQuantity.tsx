import { FC, AllHTMLAttributes } from 'react';
import c from './ChangeQuantity.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';

type IProps = {
	value: number;
	increase: () => void;
	decrease: () => void;
	change: (newValue: number) => void;
} & AllHTMLAttributes<HTMLDivElement>;
const ChangeQuantity: FC<IProps> = ({
	value,
	decrease,
	increase,
	change,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<button onClick={decrease}>
				<Icon name={'minus'} />
			</button>
			<input
				type="text"
				value={value}
				onChange={e => {
					change && change(parseInt(e.target.value) || 0);
				}}
			/>
			<button onClick={increase}>
				<Icon name={'plus'} />
			</button>
		</div>
	);
};

export default ChangeQuantity;
