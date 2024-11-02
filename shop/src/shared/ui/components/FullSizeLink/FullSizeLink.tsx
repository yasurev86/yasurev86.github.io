import { FC, ComponentProps } from 'react';
import c from './FullSizeLink.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

const FullSizeLink: FC<ComponentProps<typeof Link>> = ({
	className,
	...props
}) => {
	return <Link className={clsx(c.wrapper, className)} {...props} />;
};

export default FullSizeLink;
