import { FC, AllHTMLAttributes } from 'react';
import c from './DEBUG.module.scss';
import clsx from 'clsx';

type IProps = {
	data: any;
	name?: string;
	tabSize?: number;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data' | 'name'>;
const DEBUG: FC<IProps> = ({
	name,
	data,
	tabSize = 4,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{name && <p>{name}</p>}
			<pre>{JSON.stringify(data, null, tabSize)}</pre>
		</div>
	);
};

export default DEBUG;
