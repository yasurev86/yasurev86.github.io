import { FC, AllHTMLAttributes, memo } from 'react';
import c from './AdvantagesSection.module.scss';
import clsx from 'clsx';
import Block from './Block/Block';
import Scrollbar from './Scrollbar/Scrollbar';
import { fetchApi } from '@/shared/api';
import { TIconName } from '@/shared/ui/components/Icon';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const AdvantagesSection: FC<IProps> = async ({ className, ...props }) => {
	const response = await fetchApi<{
		blocks: {
			id: number;
			content: string;
			caption: string;
			icon: TIconName;
		}[];
	}>('advantages-block', {
		populate: '*',
	});

	if (!response.data) return null;

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Scrollbar>
				<div className={c.container}>
					{response.data.attributes.blocks.map(
						({ id, caption, content, icon }) => (
							<Block
								className={c.block}
								key={id}
								icon={icon}
								caption={caption}
								text={content}
							/>
						),
					)}
				</div>
			</Scrollbar>
		</div>
	);
};

export default memo(AdvantagesSection);
