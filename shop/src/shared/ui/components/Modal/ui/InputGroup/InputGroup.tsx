import { FC, AllHTMLAttributes } from 'react';
import c from './InputGroup.module.scss';
import clsx from 'clsx';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const InputGroup: FC<IProps> = ({ className, children, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{children}
		</div>
	);
};

export default InputGroup;