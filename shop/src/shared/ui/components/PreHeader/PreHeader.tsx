import React, { AllHTMLAttributes, FC } from 'react';
import c from './PreHeader.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import Link from 'next/link';
import { fetchApi } from '@/shared/api';
import { linkPopulate } from '@/entities/Link';
import { ILink } from '@/entities/Link';
import { LinksMap } from '@/entities/Link';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const PreHeader: FC<IProps> = async ({ className, ...props }) => {
	const linksResponse = await fetchApi<{
		left_links: ILink[];
		center_links: ILink[];
	}>('preheader', {
		populate: {
			left_links: {
				...linkPopulate,
			},
			center_links: {
				...linkPopulate,
			},
		},
	});

	const scheduleResponse = await fetchApi<{
		schedule: string;
	}>('shared', {
		fields: ['schedule'],
	});

	const links = linksResponse.data?.attributes;

	if (!links) return null;

	return (
		<div
			className={clsx(c.wrapper, '_no-bottom-margin', className)}
			{...props}
		>
			<div className={clsx('content', c.inner)}>
				<ul className={c.info}>
					<LinksMap
						links={links.left_links}
						component={(href, text, link) => (
							<li key={link.id}>
								<Link href={href}>{text}</Link>
							</li>
						)}
					/>
				</ul>
				<ul className={c.nav}>
					<LinksMap
						links={links.center_links}
						component={(href, text, link) => (
							<li key={link.id}>
								<Link href={href}>{text}</Link>
							</li>
						)}
					/>
				</ul>
				<span className={c.schedule}>
					<Icon name={'calendar'} style={{ marginRight: '.4em' }} />
					{scheduleResponse.data?.attributes.schedule ?? '-'}
				</span>
			</div>
		</div>
	);
};

export default PreHeader;
