import { FC, AllHTMLAttributes } from 'react';
import c from './UserCard.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { useGetUserDataQuery } from '@/entities/User/api/userApi';
import Skeleton from 'react-loading-skeleton';
import { useLogout } from '@/shared/hooks/useLogout';
import { getAvatar } from '@/entities/User/utils/getAvatar';
import { getFullNameString } from '@/entities/User';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = { exitBtn?: boolean } & AllHTMLAttributes<HTMLDivElement>;
const UserCard: FC<IProps> = ({ exitBtn = false, className, ...props }) => {
	const { data, isLoading } = useGetUserDataQuery(undefined);

	const logout = useLogout();

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<FullSizeLink href={'/profile/settings'} />
			<img src={getAvatar(data?.avatar)} alt="avatar" loading="lazy" />
			<div className={c.userInfo}>
				<span className={c.name}>
					{isLoading ? <Skeleton /> : getFullNameString(data)}
				</span>
				<span className={c.email}>
					{i18n('go_to_personal_account')}
				</span>
			</div>
			{exitBtn && (
				<button className={c.exitBtn} onClick={logout}>
					<Icon name={'exit'} />
				</button>
			)}
		</div>
	);
};

export default UserCard;
