'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './GoogleBlock.module.scss';
import clsx from 'clsx';

import IconGoogle from '@/shared/assets/icons/google.svg';
import { Btn, Icon } from '@/shared/ui/components';
import { useGetUserDataQuery } from '@/entities/User/api/userApi';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import Skeleton from 'react-loading-skeleton';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const GoogleBlock: FC<IProps> = ({ className, ...props }) => {
	const { data, isLoading } = useGetUserDataQuery(undefined);

	const isConnected = data
		? data.auths.reduce((acc, el) => acc || el.provider == 'google', false)
		: false;

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.icon}>
				<IconGoogle />
			</div>
			<span className={c.text}>Google</span>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				data={data}
				fallback={<Skeleton />}
				content={() => (
					<>
						{isConnected ? (
							<Icon name={'checkbox'} className={c.checked} />
						) : (
							<Btn
								use={'tertiary-accent'}
								size={'small'}
								link={`/api/auth/google/redirect/connect`}
							>
								{i18n('connect')}
							</Btn>
						)}
					</>
				)}
				emptyResult={i18n('loading')}
			/>
		</div>
	);
};

export default GoogleBlock;
