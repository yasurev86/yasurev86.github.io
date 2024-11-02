import { FC, AllHTMLAttributes } from 'react';
import c from './AvatarBlock.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { useGetUserDataQuery, getAvatar } from '@/entities/User';
import { useModal } from '@/shared/store/hooks';
import { changeAvatarModalName } from '@/features/modals/ChangeAvatarModal';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const AvatarBlock: FC<IProps> = ({ className, ...props }) => {
	const { data, isLoading } = useGetUserDataQuery(undefined);
	const { open } = useModal(changeAvatarModalName);
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.info}>
				<div className={c.avatar} onClick={open}>
					<img src={getAvatar(data?.avatar)} alt="" loading="lazy" />
					<span>
						<Icon name={'gallery-add'} />
					</span>
				</div>
				<div className={c.text}>
					<p>{i18n('avatar')}</p>
					<span>{i18n('you_can_change_avatar')}</span>
				</div>
			</div>
			<span className={c.types}>.png, .jpg, jpeg</span>
		</div>
	);
};

export default AvatarBlock;
