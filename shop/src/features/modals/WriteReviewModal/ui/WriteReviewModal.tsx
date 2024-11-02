'use client';

import { FC, FormEvent, useState } from 'react';
import c from './WriteReviewModal.module.scss';
import Modal, { BtnGroup } from '@/shared/ui/components/Modal';
import { Btn, Input } from '@/shared/ui/components';
import ChooseRating from '@/features/modals/WriteReviewModal/ui/ChooseRating/ChooseRating';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { useAddReviewMutation } from '@/entities/Review';
import { useToggle } from '@/shared/hooks';
import toast from 'react-hot-toast';
import { selectorModalsDataByKey } from '@/shared/store/reducers/Modals';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const writeReviewModalName = 'writeReview';
const WriteReviewModal: FC<IProps> = () => {
	const { close } = useModal(writeReviewModalName);

	const product_variant = useAppSelector(state =>
		selectorModalsDataByKey(state, 'id'),
	);

	const [data, setData] = useState<{
		rating: number | undefined;
		text: string;
	}>({
		rating: undefined,
		text: '',
	});

	const {
		isActive: ratingError,
		enable: enableRatingError,
		disable: disableRatingError,
	} = useToggle();

	const [addReview] = useAddReviewMutation();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let valid = true;

		if (!data.rating) {
			enableRatingError();
			valid = false;
		}

		if (valid) {
			await toast
				.promise(
					addReview({
						product_variant,
						rating: data.rating as number,
						text: data.text,
					}),
					{
						loading: i18n('review_adding'),
						success: i18n('review_success'),
						error: i18n('review_error'),
					},
				)
				.then(res => {
					if (!('error' in res)) {
						setData({ rating: undefined, text: '' });
						close();
					}
				});
		}
	};

	return (
		<Modal
			caption={i18n('write_review')}
			name={writeReviewModalName}
			className={c.modalInner}
		>
			<form onSubmit={handleSubmit}>
				<div className={c.rating}>
					<p className={c.ratingLabel}>{i18n('rate_product')}</p>
					<ChooseRating
						rating={data.rating}
						onChange={(rating: number) => {
							disableRatingError();
							setData(cur => ({ ...cur, rating }));
						}}
						hasError={ratingError}
					/>
				</div>
				<Input
					label={i18n('comment')}
					rows={7}
					isTextarea
					maxLength={100}
					value={data.text}
					onChange={e =>
						setData(cur => ({ ...cur, text: e.target.value }))
					}
				/>
				<BtnGroup className={c.btns}>
					<Btn type={'submit'} size={'large'} fullWidth>
						{i18n('publish_review')}
					</Btn>
					<Btn
						size={'medium'}
						use={'tertiary-accent'}
						onClick={close}
					>
						{i18n('cancel')}
					</Btn>
				</BtnGroup>
			</form>
		</Modal>
	);
};

export default WriteReviewModal;
