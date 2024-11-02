import { FC, AllHTMLAttributes } from 'react';
import c from './ReceiverBlock.module.scss';
import clsx from 'clsx';
import { Btn, Input } from '@/shared/ui/components';
import SwapBlock from '../SwapBlock/SwapBlock';
import { IUserInfo } from '../../model/IUserInfo';
import { useGetUserDataQuery } from '@/entities/User';
import { getAvatar, getFullNameString } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {
	value?: Partial<IUserInfo>;
	handleChange: (field: string, value: string) => void;
	isDefaultOpened?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'value'>;
const ReceiverBlock: FC<IProps> = ({
	value,
	handleChange,
	className,
	isDefaultOpened,
	...props
}) => {
	const { data, isLoading } = useGetUserDataQuery(undefined);

	return (
		<SwapBlock
			image={value?.name ? getAvatar(undefined) : getAvatar(data?.avatar)}
			name={
				value?.name
					? `${value?.name} ${value?.surname}`
					: getFullNameString(data)
			}
			description={(value?.name ? value.email : data?.email) || '-'}
			isDefaultOpened={isDefaultOpened}
		>
			{close => (
				<>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('phone')}
							className={'col_6 col_428_12'}
							value={value?.phone}
							onChange={e =>
								handleChange('phone', e.target.value)
							}
							mask={i18n('phone_mask')}
						/>
						<Input
							label={i18n('email')}
							className={'col_6 col_428_12'}
							value={value?.email}
							onChange={e =>
								handleChange('email', e.target.value)
							}
						/>
					</div>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('surname')}
							className={'col_6 col_428_12'}
							value={value?.surname}
							onChange={e =>
								handleChange('surname', e.target.value)
							}
						/>
						<Input
							label={i18n('name')}
							className={'col_6 col_428_12'}
							value={value?.name}
							onChange={e => handleChange('name', e.target.value)}
						/>
					</div>
					<div className={clsx('row', c.row)}>
						<Btn
							className={'col_3 col_768_6 col_428_12'}
							onClick={close}
						>
							{i18n('save')}
						</Btn>
						<Btn
							use={'tertiary'}
							className={'col_428_12'}
							style={{ justifySelf: 'center' }}
							onClick={close}
						>
							{i18n('cancel')}
						</Btn>
					</div>
				</>
			)}
		</SwapBlock>
	);
};

export default ReceiverBlock;
