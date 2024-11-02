'use client';

import { AllHTMLAttributes, FC, useContext, useEffect, useState } from 'react';
import c from './BaseInfoSection.module.scss';
import clsx from 'clsx';
import { InfoLine, Btn, Input, Select } from '@/shared/ui/components';
import GoogleBlock from '../GoogleBlock/GoogleBlock';
import { useToggle } from '@/shared/hooks';
import {
	changePasswordModalName,
	deleteAccountModalName,
} from '@/features/modals';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { MediaContext } from '@/_app/providers/MediaProvider';
import {
	useChangeUserDataMutation,
	useGetUserDataQuery,
	IUser,
} from '@/entities/User';
import { selectorUserId } from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';
import { formatDate } from '../../lib/formatDate';

const currentYear = new Date().getFullYear();

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const BaseInfoSection: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w427: maw427 },
	} = useContext(MediaContext);

	const { isActive: edit, toggle } = useToggle();

	const { data, isFetching } = useGetUserDataQuery(undefined);
	const [changeUserData] = useChangeUserDataMutation();

	useEffect(() => {
		if (data) {
			const birthdateDate = data.birthdate
				? new Date(data.birthdate)
				: undefined;

			setBaseData({
				name: data.name ?? '',
				surname: data.surname ?? '',
				patronymic: data.patronymic ?? '',
				phone: data.phone ?? '',
				email: data.email,
				birthdate: {
					day: birthdateDate?.getDate().toString(),
					month: birthdateDate?.getMonth().toString(),
					year: birthdateDate?.getFullYear().toString(),
				},
			});
		}
	}, [data]);

	const [baseData, setBaseData] = useState<
		Pick<IUser, 'name' | 'surname' | 'patronymic' | 'phone' | 'email'> & {
			birthdate: {
				day: string | undefined;
				month: string | undefined;
				year: string | undefined;
			};
		}
	>({
		name: '',
		surname: '',
		patronymic: '',
		birthdate: {
			day: undefined,
			month: undefined,
			year: undefined,
		},
		phone: '',
		email: '',
	});

	const {
		[changePasswordModalName]: { open: openChangePasswordModal },
		[deleteAccountModalName]: { open: openDeleteAccountModal },
	} = useModal([changePasswordModalName, deleteAccountModalName]);

	const userId = useAppSelector(selectorUserId);

	const cancelChanges = () => {
		toggle();
		if (!data) return;

		const birthdateDate = data.birthdate
			? new Date(data.birthdate)
			: undefined;

		setBaseData({
			name: data.name ?? '',
			surname: data.surname ?? '',
			patronymic: data.patronymic ?? '',
			birthdate: {
				day: birthdateDate?.getDay().toString(),
				month: birthdateDate?.getMonth().toString(),
				year: birthdateDate?.getFullYear().toString(),
			},
			phone: data.phone ?? '',
			email: data.email,
		});
	};

	const saveChanges = () => {
		if (!userId || !baseData) return;
		toggle();
		const { day, month, year } = baseData.birthdate;
		changeUserData({
			id: userId,
			data: {
				...baseData,
				birthdate: [
					year,
					month?.toString().padStart(2, '0'),
					day?.toString().padStart(2, '0'),
				].join('-'),
			} as Partial<IUser>,
		});
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{edit ? (
				<>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('name')}
							className={'col_4 col_428_12'}
							value={baseData.name || ''}
							onChange={e =>
								setBaseData(cur => ({
									...cur,
									name: e.target.value.replace(
										/[^\p{L}]/gu,
										'',
									),
								}))
							}
						/>
						<Input
							label={i18n('surname')}
							className={'col_4 col_428_12'}
							value={baseData.surname || ''}
							onChange={e =>
								setBaseData(cur => ({
									...cur,
									surname: e.target.value.replace(
										/[^\p{L}]/gu,
										'',
									),
								}))
							}
						/>
						<Input
							label={i18n('patronymic')}
							className={'col_4 col_428_12'}
							value={baseData.patronymic || ''}
							onChange={e =>
								setBaseData(cur => ({
									...cur,
									patronymic: e.target.value.replace(
										/[^\p{L}]/gu,
										'',
									),
								}))
							}
						/>
					</div>
					<div className={clsx('row', c.row)}>
						<Input
							label={i18n('phone')}
							className={'col_6 col_428_12'}
							value={baseData.phone || ''}
							onChange={e =>
								setBaseData(cur => ({
									...cur,
									phone: e.target.value,
								}))
							}
							mask={i18n('phone_mask')}
						/>
						<Input
							label={i18n('email')}
							className={'col_6 col_428_12'}
							value={baseData.email}
							onChange={e =>
								setBaseData(cur => ({
									...cur,
									email: e.target.value,
								}))
							}
						/>
					</div>
					<p className={c.label}>{i18n('birthdate')}</p>
					<div className={clsx('row', c.row)}>
						<Select
							value={baseData.birthdate?.day?.toString() || ''}
							onChange={day =>
								setBaseData(cur => ({
									...cur,
									birthdate: {
										...cur.birthdate,
										day,
									},
								}))
							}
							items={Object.fromEntries(
								Array.from({ length: 31 }).map((_, ind) => [
									ind + 1,
									(ind + 1).toString(),
								]),
							)}
							className={clsx(
								'col_2 col_428_4 col_360_12',
								c.select,
							)}
							placeholder={i18n('day')}
						/>
						<Select
							items={Object.fromEntries(
								[
									i18n('january'),
									i18n('february'),
									i18n('march'),
									i18n('april'),
									i18n('may'),
									i18n('june'),
									i18n('july'),
									i18n('august'),
									i18n('september'),
									i18n('october'),
									i18n('november'),
									i18n('december'),
								].map((name, ind) => [ind, name]),
							)}
							value={baseData.birthdate?.month?.toString() || ''}
							onChange={month =>
								setBaseData(cur => ({
									...cur,
									birthdate: {
										...cur.birthdate,
										month,
									},
								}))
							}
							className={clsx(
								'col_2 col_428_4 col_360_12',
								c.select,
							)}
							placeholder={i18n('month')}
						/>
						<Select
							value={baseData.birthdate?.year?.toString() || ''}
							onChange={year =>
								setBaseData(cur => ({
									...cur,
									birthdate: {
										...cur.birthdate,
										year,
									},
								}))
							}
							items={Array.from({ length: 150 }).map((_, ind) =>
								(currentYear - 18 - ind).toString(),
							)}
							className={clsx(
								'col_2 col_428_4 col_360_12',
								c.select,
							)}
							placeholder={i18n('year')}
						/>
					</div>
				</>
			) : (
				<>
					<InfoLine
						withBorder
						name={i18n('name')}
						content={baseData.name || ''}
						isLoading={isFetching}
					/>
					<InfoLine
						withBorder
						name={i18n('surname')}
						content={baseData.surname || ''}
						isLoading={isFetching}
					/>
					<InfoLine
						withBorder
						name={i18n('patronymic')}
						content={baseData.patronymic || ''}
						isLoading={isFetching}
					/>
					<InfoLine
						withBorder
						name={i18n('birthdate')}
						content={
							// @ts-ignore
							formatDate(baseData.birthdate) || ''
						}
						isLoading={isFetching}
					/>
					<InfoLine
						withBorder
						name={i18n('phone')}
						content={baseData.phone || ''}
						isLoading={isFetching}
					/>
					<InfoLine
						withBorder
						name={i18n('email')}
						content={baseData.email}
						isLoading={isFetching}
					/>
				</>
			)}
			<GoogleBlock className={c.googleBlock} />
			<div className={c.actions}>
				{edit ? (
					<div style={{ display: 'flex', gap: 15 }}>
						<Btn
							onClick={saveChanges}
							size={maw427 ? 'small' : undefined}
						>
							{i18n('save')}
						</Btn>
						<Btn
							onClick={cancelChanges}
							size={maw427 ? 'small' : undefined}
							use={'tertiary'}
						>
							{i18n('cancel')}
						</Btn>
					</div>
				) : (
					<Btn
						icon={'edit'}
						use={'tertiary'}
						size={maw427 ? 'small' : 'medium'}
						onClick={toggle}
					>
						{i18n('edit_data')}
					</Btn>
				)}
				<div>
					<Btn
						size={maw427 ? 'small' : 'medium'}
						use={'tertiary-accent'}
						onClick={openChangePasswordModal}
					>
						{i18n('change_password')}
					</Btn>
					<Btn
						size={maw427 ? 'small' : 'medium'}
						use={'tertiary-accent'}
						onClick={openDeleteAccountModal}
					>
						{i18n('delete_account')}
					</Btn>
				</div>
			</div>
		</div>
	);
};

export default BaseInfoSection;
