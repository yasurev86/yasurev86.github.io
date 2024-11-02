import { FC, AllHTMLAttributes } from 'react';
import c from './InfoBlock.module.scss';
import clsx from 'clsx';

type IProps = { name: string } & AllHTMLAttributes<HTMLDivElement>;
const InfoBlock: FC<IProps> = ({ name, className, children, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<span className={c.name}>{name}</span>
			{children}
		</div>
	);
};

export default InfoBlock;
