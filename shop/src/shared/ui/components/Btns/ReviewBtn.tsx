'use client';

import { FC, ComponentProps, useContext } from 'react';
import { Btn } from '@/shared/ui/components';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { i18n } from '@/shared/i18n';

type IProps = Omit<ComponentProps<typeof Btn>, 'icon' | 'size' | 'use'>;
const ReviewBtn: FC<IProps> = ({ ...props }) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);
	return (
		<Btn
			icon={'review'}
			size={maw767 ? 'small' : 'medium'}
			use={'tertiary-accent'}
			{...props}
		>
			{i18n('leave_a_review')}
		</Btn>
	);
};

export default ReviewBtn;
