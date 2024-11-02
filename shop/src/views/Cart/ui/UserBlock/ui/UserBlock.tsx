'use client';

import {
	FC,
	AllHTMLAttributes,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	FormEvent,
} from 'react';
import c from './UserBlock.module.scss';
import clsx from 'clsx';
import SwapBlock from '../../SwapBlock/SwapBlock';
import GoogleAuthBtn from '@/features/GoogleAuthBtn';
import { useAppSelector } from '@/shared/store/hooks';
import AuthForm from './AuthForm/AuthForm';
import { IUserInfo } from '../../../model/IUserInfo';
import {
	useChangeUserDataMutation,
	useGetUserDataQuery,
} from '@/entities/User';
import { ConditionalLoadingBlock, Btn, Input } from '@/shared/ui/components';
import { getAvatar, getFullNameString, IUser } from '@/entities/User';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';

type TypeTabsProps = {
	newUser: IUserInfo;
	setNewUser: Dispatch<SetStateAction<IUserInfo>>;
} & AllHTMLAttributes<HTMLDivElement>;
const Tabs: FC<TypeTabsProps> = ({
	newUser,
	setNewUser,
	className,
	...props
}) => {
	const [tab, setTab] = useState<number>(0);
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.chooseTab}>
				<button
					onClick={() => setTab(0)}
					className={tab == 0 ? c.activeTabBtn : ''}
				>
					{i18n('new_user')}
				</button>
				<button
					onClick={() => setTab(1)}
					className={tab == 1 ? c.activeTabBtn : ''}
				>
					{i18n('already_has_account')}
				</button>
			</div>
			{tab == 0 && (
				<>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('phone')}
							className={'col_6 col_428_12'}
							mask={i18n('phone_mask')}
							value={newUser.phone}
							onChange={e =>
								setNewUser(cur => ({
									...cur,
									phone: e.target.value,
								}))
							}
						/>
						<Input
							label={i18n('email')}
							className={'col_6 col_428_12'}
							value={newUser.email}
							onChange={e =>
								setNewUser(cur => ({
									...cur,
									email: e.target.value,
								}))
							}
						/>
					</div>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('surname')}
							className={'col_6 col_428_12'}
							value={newUser.surname}
							onChange={e =>
								setNewUser(cur => ({
									...cur,
									surname: e.target.value,
								}))
							}
						/>
						<Input
							label={i18n('name')}
							className={'col_6 col_428_12'}
							value={newUser.name}
							onChange={e =>
								setNewUser(cur => ({
									...cur,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<GoogleAuthBtn style={{ marginTop: 20 }} remember={true} />
				</>
			)}
			{tab == 1 && <AuthForm />}
		</div>
	);
};

const Logged: FC<IProps> = ({ className, ...props }) => {
	const { data, isLoading } = useGetUserDataQuery(undefined);
	const [changeUserData] = useChangeUserDataMutation();
	const [userData, setUserData] = useState<IUserInfo>({
		name: '',
		surname: '',
		email: '',
		phone: '',
	});
	useEffect(() => {
		if (!data) return;
		const { name, surname, email, phone } = data;

		// @ts-ignore
		setUserData({ name, surname, email, phone });
	}, [isLoading]);

	const handleSubmit = (e: FormEvent, onSuccess: () => void) => {
		e.preventDefault();

		if (!data || !data.id) return;

		changeUserData({ id: data.id, data: userData as Partial<IUser> });
		onSuccess();
	};

	return (
		<ConditionalLoadingBlock
			isLoading={isLoading}
			data={data}
			content={() => (
				<SwapBlock
					image={getAvatar(data?.avatar)}
					name={getFullNameString(data)}
					description={data?.email || '-'}
				>
					{close => (
						<form onSubmit={e => handleSubmit(e, close)}>
							<div className={clsx('row', c.row)}>
								<Input
									label={i18n('phone')}
									className={'col_6 col_428_12'}
									mask={i18n('phone_mask')}
									value={userData.phone}
									onChange={e =>
										setUserData(cur => ({
											...cur,
											phone: e.target.value,
										}))
									}
								/>
								<Input
									label={i18n('email')}
									className={'col_6 col_428_12'}
									value={userData.email}
									onChange={e =>
										setUserData(cur => ({
											...cur,
											email: e.target.value,
										}))
									}
								/>
							</div>
							<div className={clsx('row', c.row)}>
								<Input
									label={i18n('surname')}
									className={'col_6 col_428_12'}
									value={userData.surname}
									onChange={e =>
										setUserData(cur => ({
											...cur,
											surname: e.target.value,
										}))
									}
								/>
								<Input
									label={i18n('name')}
									className={'col_6 col_428_12'}
									value={userData.name}
									onChange={e =>
										setUserData(cur => ({
											...cur,
											name: e.target.value,
										}))
									}
								/>
							</div>
							<Btn type={'submit'} className={c.confirmBtn}>
								{i18n('save')}
							</Btn>
						</form>
					)}
				</SwapBlock>
			)}
			emptyResult={<>{i18n('something_went_wrong')}</>}
		/>
	);
};

type IProps = {
	newUser: IUserInfo;
	setNewUser: Dispatch<SetStateAction<IUserInfo>>;
} & AllHTMLAttributes<HTMLDivElement>;
const UserBlock: FC<IProps> = ({ className, ...props }) => {
	const isLogged = useAppSelector(selectorUserIsLogged);
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{isLogged ? <Logged {...props} /> : <Tabs {...props} />}
		</div>
	);
};

export default UserBlock;
