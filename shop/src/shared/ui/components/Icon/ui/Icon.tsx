import { FC, HTMLAttributes } from 'react';
import c from './Icon.module.scss';
import clsx from 'clsx';
import { TIconName } from '../model/TIconName';

type IProps = {
	name: TIconName;
} & HTMLAttributes<HTMLElement>;
const Icon: FC<IProps> = ({ name, className, ...props }) => {
	return (
		<i className={clsx(c.icon, c[`icon-${name}`], className)} {...props} />
	);
};

export default Icon;
