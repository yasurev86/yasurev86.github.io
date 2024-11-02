import { ILink } from '../model/ILink';
import { FC, ReactNode } from 'react';
import { getLinkData } from '../utils/getLinkData';

type IProps = {
	links: ILink[];
	component: (href: string, text: string, link: ILink) => ReactNode;
};

const LinksMap: FC<IProps> = ({ links, component }) => {
	return (
		<>
			{links.map(link => {
				const { href, text } = getLinkData(link);
				return component(href, text, link);
			})}
		</>
	);
};

export default LinksMap;
