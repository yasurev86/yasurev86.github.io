'use client';

import { FC, HTMLAttributes, useContext, useState } from 'react';
import c from './FooterBlock.module.scss';
import clsx from 'clsx';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { Icon } from '@/shared/ui/components';

type IProps = {
	caption: string;
} & HTMLAttributes<HTMLDivElement>;
const FooterBlock: FC<IProps> = ({
	caption,
	children,
	className,
	...props
}) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const toggleIsOpened = () => maw767 && setIsOpened(cur => !cur);

	return (
		<div
			className={clsx(c.wrapper, className, isOpened && c['_is-opened'])}
			{...props}
		>
			<div className={c.caption} onClick={toggleIsOpened}>
				{caption}
				{maw767 && <Icon name={'arrow-down'} className={c.arrow} />}
			</div>
			{(!maw767 || isOpened) && <>{children}</>}
		</div>
	);
};

export default FooterBlock;
