import React, { AllHTMLAttributes, FC, useState } from 'react';
import c from './Review.module.scss';
import clsx from 'clsx';
import { formatDate } from '@/shared/utils';
import { Btn, Icon } from '@/shared/ui/components';
import { useAppSelector, useModal } from '@/shared/store/hooks';
import { loginModalName, replyModalName } from '@/features/modals';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import {
	useGetReviewRepliesQuery,
	useRemoveReviewMutation,
	ReviewReply,
	IReview,
	IReviewReply,
} from '@/entities/Review';
import {
	selectorUserId,
	selectorUserIsLogged,
} from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';

const IconStar = ({ disabled }: { disabled: boolean }) => (
	<Icon
		name={'star'}
		className={clsx(c.star, disabled && c['star--disabled'])}
	/>
);

type IProps = IReview & {
	variant_id: number;
	variant?: 'withAvatar' | 'default';
	canDelete?: boolean;
	canReply?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Review: FC<IProps> = ({
	variant = 'default',
	canDelete,
	canReply = true,
	variant_id,

	id,
	user: { id: authorId, name, surname, avatar },
	date,
	rating,
	text,

	className,
	...props
}) => {
	const isLogged = useAppSelector(selectorUserIsLogged);
	const userId = useAppSelector(selectorUserId);

	const {
		[replyModalName]: { open: openReplyModal },
		[loginModalName]: { open: openLoginModal },
	} = useModal([replyModalName, loginModalName]);

	const [limit, setLimit] = useState(3);

	const { data: replies, isFetching } = useGetReviewRepliesQuery({
		limit,
		id,
	});

	const [removeReview] = useRemoveReviewMutation();

	const handleDelete = () => {
		removeReview({ variant_id, id });
	};

	const handleLoadMore = () => {
		setLimit(cur => cur + 3);
	};

	return (
		<div className={clsx(c.wrapper, c[`variant--${variant}`], className)}>
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
						<span className={c.date}>{formatDate(date)}</span>
					</div>
					{rating && (
						<div className={c.rating}>
							{Array.from({ length: 5 }).map((_, ind) => (
								<IconStar
									key={ind}
									disabled={ind + 1 > rating}
								/>
							))}
						</div>
					)}
				</div>
				{canDelete && (
					<Btn
						use={'tertiary'}
						className={c.deleteBtn}
						size={'medium'}
						onClick={handleDelete}
					>
						{i18n('delete')}
					</Btn>
				)}
			</div>
			<p className={c.text}>{text}</p>
			{canReply && (
				<button
					className={c.replyBtn}
					onClick={() =>
						isLogged
							? openReplyModal({ branch: id, reply_to: authorId })
							: openLoginModal()
					}
				>
					<Icon name={'right-bottom'} />
					{i18n('reply')}
				</button>
			)}
			<ConditionalLoadingBlock
				isLoading={isFetching}
				data={replies?.data}
				fallback={
					<>
						{replies?.data && (
							<div className={c.loadingRepliesContainer}>
								{replies?.data.map(({ reply_to, ...data }) => (
									<ReviewReply
										{...data}
										reply_to={
											reply_to
												? reply_to
												: `${name} ${surname}`
										}
										canDelete={
											isLogged
												? data.user.id == userId
												: false
										}
										variant={'withAvatar'}
										className={c.reply}
									/>
								))}
							</div>
						)}
						<p className={c.loadingRepliesText}>
							{i18n('loading_replies')}
						</p>
					</>
				}
				content={(items: IReviewReply[]) => (
					<>
						{items.map(({ reply_to, ...data }) => (
							<ReviewReply
								{...data}
								reply_to={
									reply_to ? reply_to : `${name} ${surname}`
								}
								canDelete={
									isLogged ? data.user.id == userId : false
								}
								variant={'withAvatar'}
								className={c.reply}
							/>
						))}
						{replies?.pagination &&
							replies.pagination.total >
								replies.pagination.limit && (
								<Btn
									use={'tertiary-accent'}
									className={c.loadMore}
									onClick={handleLoadMore}
									size={'medium'}
								>
									{i18n('load_more')}
								</Btn>
							)}
					</>
				)}
				emptyResult={<></>}
			/>
		</div>
	);
};

export default Review;
