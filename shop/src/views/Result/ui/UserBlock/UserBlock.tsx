'use client';

import { FC, useContext } from 'react';
import c from './UserBlock.module.scss';
import clsx from 'clsx';
import { ExclusiveProperties } from '@/shared/types/utilityTypes';
import { Btn } from '@/shared/ui/components';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import { ReviewBtn } from '@/shared/ui/components/Btns';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { i18n } from '@/shared/i18n';

type IProps = ExclusiveProperties<{ image: string; icon: TIconName }> & {
	name: string;
	description: string;
	className?: string;
};
const UserBlock: FC<IProps> = ({
	image,
	icon,
	name,
	description,
	className,
	...props
}) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.iconOrImage}>
				{image && <img src={image} alt="" loading="lazy" />}
				{icon && <Icon name={icon} />}
			</div>
			<div className={c.info}>
				<p className={c.name}>{name}</p>
				<p className={c.description}>{description}</p>
			</div>
			<div className={c.btns}>
				<ReviewBtn link={'/profile/reviews'} />
				<Btn
					link={'/profile/orders'}
					use={'tertiary'}
					size={maw767 ? 'small' : 'medium'}
				>
					{i18n('my_orders')}
				</Btn>
			</div>
		</div>
	);
};

export default UserBlock;
