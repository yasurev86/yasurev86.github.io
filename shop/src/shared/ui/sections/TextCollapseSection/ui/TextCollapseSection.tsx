'use client';

import { FC, AllHTMLAttributes, useState } from 'react';
import c from './TextCollapseSection.module.scss';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';

type IProps = {
	caption?: string;
	content: string;
} & AllHTMLAttributes<HTMLDivElement>;
const TextCollapseSection: FC<IProps> = ({
	caption,
	content,
	className,
	...props
}) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const toggle = () => setIsOpened(cur => !cur);

	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			{caption && <h2 className={c.caption}>{caption}</h2>}
			<div
				className={clsx(c.text, isOpened && c['text--opened'])}
				onClick={!isOpened ? toggle : undefined}
			>
				{content}
			</div>
			<button className={c.toggle} onClick={toggle}>
				{isOpened ? i18n('wrap') : i18n('unwrap')}
			</button>
		</section>
	);
};

export default TextCollapseSection;
