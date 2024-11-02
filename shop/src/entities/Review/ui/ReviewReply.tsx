import React, { AllHTMLAttributes, FC } from 'react';
import c from './Review.module.scss';
import clsx from 'clsx';
import { IReviewReply } from '@/entities/Review';
import { formatDate } from '@/shared/utils';
import { Btn, Icon } from '@/shared/ui/components';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { loginModalName, replyModalName } from '@/features/modals';
import { useRemoveReviewReplyMutation } from '@/entities/Review/api/reviewApi';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';

type IProps = IReviewReply & {
	variant?: 'withAvatar' | 'default';
	canDelete?: boolean;
	canReply?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Review: FC<IProps> = ({
	variant = 'default',
	canDelete,
	canReply = true,

	id,
	user: { id: authorId, name, surname, avatar },
	date,
	text,

	reply_to,
	branch,

	className,
	...props
}) => {
	const isLogged = useAppSelector(selectorUserIsLogged);
	const {
		[replyModalName]: { open: openReplyModal },
		[loginModalName]: { open: openLoginModal },
	} = useModal([replyModalName, loginModalName]);

	const [removeReviewReply] = useRemoveReviewReplyMutation();

	const handleDelete = () => {
		removeReviewReply({ branch, id });
	};

	return (
		<div
			className={clsx(c.wrapper, c[`variant--${variant}`], className)}
			{...props}
		>
			{variant == 'withAvatar' && (
				<img
					src={avatar || '/assets/images/shared/avatars/1.png'}
					alt={''}
					loading="lazy"
					className={c.avatar}
				/>
			)}
			<div className={c.header}>
				<div className={c.headerMain}>
					<div className={c.meta}>
						<span className={c.name}>
							{name} {surname}
						</span>
						<span className={c.replyToName}>
							<span>→</span> {reply_to}
						</span>
						<span className={c.date}>{formatDate(date)}</span>
					</div>
				</div>
				{canDelete && (
					<Btn
						use={'tertiary'}
						className={c.deleteBtn}
						size={'medium'}
						onClick={handleDelete}
					>
						Удалить
					</Btn>
				)}
			</div>
			<p className={c.text}>{text}</p>
			{canReply && (
				<button
					className={c.replyBtn}
					onClick={() =>
						isLogged
							? openReplyModal({
									branch: branch,
									reply_to: authorId,
								})
							: openLoginModal()
					}
				>
					<Icon name={'right-bottom'} />
					Ответить
				</button>
			)}
		</div>
	);
};

export default Review;
