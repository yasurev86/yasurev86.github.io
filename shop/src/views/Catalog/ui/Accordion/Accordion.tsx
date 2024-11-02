'use client';

import { FC, AllHTMLAttributes, useState } from 'react';
import c from './Accordion.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';

type IProps = {
	header: string;
	isInitialOpened?: boolean;
	count?: number;
} & AllHTMLAttributes<HTMLDivElement>;
const Accordion: FC<IProps> = ({
	header,
	className,
	children,
	isInitialOpened = false,
	count,
	...props
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(isInitialOpened);

	const toggleIsOpen = () => setIsOpen(cur => !cur);

	return (
		<div
			className={clsx(c.wrapper, isOpen && c['_is-open'], className)}
			{...props}
		>
			<div className={c.header} onClick={toggleIsOpen}>
				<span className={c.text}>
					{header} {count && <span>{count}</span>}
				</span>
				<div className={clsx(c.arrow, isOpen && c.revert)}>
					<Icon name={'arrow-down'} />
				</div>
			</div>
			<div className={c.body}>{children}</div>
		</div>
	);
};

export default Accordion;
