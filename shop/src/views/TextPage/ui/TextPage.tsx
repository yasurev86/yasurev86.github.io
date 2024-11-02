import { FC, AllHTMLAttributes } from 'react';
import { TextSection } from '@/shared/ui/sections';
import { Breadcrumbs } from '@/shared/ui/components';

type IProps = {
	name: string;
	content: string;
} & AllHTMLAttributes<HTMLDivElement>;
const TextPage: FC<IProps> = ({ name, content, className, ...props }) => {
	return (
		<div {...props}>
			<Breadcrumbs items={[{ link: '', name: name }]} />
			<TextSection>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</TextSection>
		</div>
	);
};

export default TextPage;
