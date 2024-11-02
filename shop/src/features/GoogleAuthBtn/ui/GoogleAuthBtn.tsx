import { FC, ButtonHTMLAttributes, useContext } from 'react';
import c from './GoogleAuthBtn.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';

import IconGoogle from '@/shared/assets/icons/google.svg';
import { MediaContext } from '@/_app/providers/MediaProvider';

import { usePathname } from 'next/navigation';
import { i18n } from '@/shared/i18n';

type IProps = {
	use?: 'auth' | 'connect';
	remember: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const GoogleAuthBtn: FC<IProps> = ({
	use = 'auth',
	remember,
	className,
	...props
}) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	const pathname = usePathname();

	return (
		<Btn
			className={clsx(c.wrapper, className)}
			use={'secondary'}
			size={maw767 ? 'medium' : 'large'}
			link={`/api/auth/google/redirect/${use}?pathname=${pathname}&remember=${remember}`}
			{...props}
		>
			<div className={c.container}>
				<IconGoogle className={c.icon} />
				{i18n('login_google')}
			</div>
		</Btn>
	);
};

export default GoogleAuthBtn;
