'use client';

import React, { FC, useContext } from 'react';
import c from './Footer.module.scss';

import Logo from '@/shared/assets/images/logos/logo.svg?icon';

import FooterBlock from './FooterBlock/FooterBlock';
import FooterBlockItem from './FooterBlockItem/FooterBlockItem';
import FooterSocial from './FooterSocial/FooterSocial';
import DevelopedBy from './DevelopedBy/DevelopedBy';
import PaymentMethods from './PaymentMethods/PaymentMethods';

import Link from 'next/link';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { LinksMap } from '@/entities/Link';
import { IShared } from '@/entities/Shared';
import { IFooterBlock } from '../model/IFooterBlock';
import { i18n } from '@/shared/i18n';

type IProps = {
	blocks: IFooterBlock[];
	contacts: IShared;
};
const Footer: FC<IProps> = ({ blocks, contacts, ...props }) => {
	const {
		max: { w1400: maw1400, w767: maw767 },
	} = useContext(MediaContext);

	return (
		<div className={c.wrapper} {...props}>
			<div className="content">
				<div className={c.blocks}>
					{blocks &&
						blocks.map(({ caption, links }) => (
							<FooterBlock
								className={c.block}
								caption={caption}
								key={caption}
							>
								<LinksMap
									links={links}
									component={(href, text, link) => (
										<Link
											href={href}
											className={c.link}
											key={link.id}
										>
											{text}
										</Link>
									)}
								/>
							</FooterBlock>
						))}
					<FooterBlock className={c.block} caption={i18n('contacts')}>
						<FooterBlockItem caption={i18n('support')}>
							<Link
								href={`tel:${contacts?.phone}`}
								className={c.phone}
							>
								{contacts?.phone}
							</Link>
						</FooterBlockItem>
						<FooterBlockItem caption={i18n('physical_address')}>
							{contacts?.address}
						</FooterBlockItem>
						<FooterBlockItem caption={i18n('schedule')}>
							{contacts?.schedule}
						</FooterBlockItem>
						<FooterBlockItem caption={i18n('email')}>
							<Link
								href={`mailto:${contacts?.email}`}
								className={c.email}
							>
								{contacts?.email}
							</Link>
						</FooterBlockItem>
						<FooterSocial className={c.social} />
					</FooterBlock>
				</div>
				{maw1400 && (
					<>
						<p className={c.copy}>{i18n('all_rights_reserved')}</p>
						{maw767 && <PaymentMethods />}
					</>
				)}
				<div className={c.footer}>
					<Logo className={c.logo} />
					<div className={c.divider}></div>
					<DevelopedBy className={c.developedBy} />
					{!maw1400 && (
						<>
							<p className={c.copy}>
								{i18n('all_rights_reserved')}
							</p>
							<div className={c.divider}></div>
						</>
					)}
					{!maw767 && <PaymentMethods />}
				</div>
			</div>
		</div>
	);
};

export default Footer;
