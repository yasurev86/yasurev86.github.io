'use client';

import { FC, FormEvent, useState } from 'react';
import c from './DeleteAccountModal.module.scss';
import { Checkbox, Modal, Btn, Input } from '@/shared/ui/components';
import { useDeleteAccountMutation } from '@/entities/User';
import { useAppSelector } from '@/shared/store/hooks';
import { useLogout } from '@/shared/hooks/useLogout';
import { selectorUserId } from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const deleteAccountModalName = 'deleteAccount';
const DeleteAccountModal: FC<IProps> = () => {
	const userId = useAppSelector(selectorUserId);
	const [reason, setReason] = useState<string>('');
	const [deleteAccount] = useDeleteAccountMutation();

	const logout = useLogout();

	const minLength = 1;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!userId) return;

		deleteAccount(userId).then(async res => {
			if ('error' in res) {
				alert(i18n('something_went_wrong'));
			} else {
				await logout();
			}
		});
	};

	return (
		<Modal
			caption={i18n('delete_account_modal_caption')}
			name={deleteAccountModalName}
			className={c.modalInner}
		>
			<form onSubmit={handleSubmit}>
				<Checkbox>{i18n('delete_account_modal_text')}</Checkbox>
				<Input
					label={i18n('delete_account_enter_reason')}
					maxLength={minLength}
					isTextarea
					className={c.input}
					onChange={e => setReason(e.target.value)}
					rows={4}
				/>
				<div className={c.btns}>
					<Btn use={'tertiary-accent'}>{i18n('cancel')}</Btn>
					<Btn
						size={'large'}
						disabled={reason.length < minLength}
						type={'submit'}
					>
						{i18n('delete_account')}
					</Btn>
				</div>
			</form>
		</Modal>
	);
};

export default DeleteAccountModal;
