import { FC } from 'react';
import c from './CheckboxWithCount.module.scss';
import { Checkbox } from '@/shared/ui/components';

type IProps = { count: number } & Parameters<typeof Checkbox>[0];
const CheckboxWithCount: FC<IProps> = ({ children, count, ...props }) => {
	return (
		<Checkbox className={c.wrapper} disabled={count == 0} {...props}>
			{children}
			<span className={c.count}>{count}</span>
		</Checkbox>
	);
};

export default CheckboxWithCount;
