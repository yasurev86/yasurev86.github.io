'use client';

import { FC, FormEvent, useState } from 'react';
import c from './ReplyModal.module.scss';
import Modal, { BtnGroup } from '@/shared/ui/components/Modal';
import { Btn, Input } from '@/shared/ui/components';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { useAddReviewReplyMutation } from '@/entities/Review';
import { selectorModalsDataByKey } from '@/shared/store/reducers/Modals';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const replyModalName = 'reply';
const ReplyModal: FC<IProps> = () => {
	const { close } = useModal(replyModalName);

	const branch = useAppSelector(state =>
		selectorModalsDataByKey(state, 'branch'),
	);
	const reply_to = useAppSelector(state =>
		selectorModalsDataByKey(state, 'reply_to'),
	);

	const [text, setText] = useState<string>('');

	const [addReviewReply] = useAddReviewReplyMutation();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		addReviewReply({
			branch,
			reply_to,
			text,
		});
		setText('');
		close();
	};

	return (
		<Modal
			caption={i18n('reply')}
			name={replyModalName}
			className={c.modalInner}
		>
			<form onSubmit={handleSubmit}>
				<Input
					label={i18n('comment')}
					rows={7}
					isTextarea
					maxLength={100}
					onChange={e => setText(e.target.value)}
				/>
				<BtnGroup className={c.btns}>
					<Btn type={'submit'} size={'large'} fullWidth>
						{i18n('publish_reply')}
					</Btn>
					<Btn size={'medium'} use={'tertiary'} onClick={close}>
						{i18n('cancel')}
					</Btn>
				</BtnGroup>
			</form>
		</Modal>
	);
};

export default ReplyModal;
