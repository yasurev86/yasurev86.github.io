import { FC } from 'react';
import { fetchApi } from '@/shared/api';
import TextPage from '@/views/TextPage';
import { notFound } from 'next/navigation';

type IProps = {
	params: {
		textPageSlug: string;
	};
};
const TextPagePage: FC<IProps> = async ({ params: { textPageSlug } }) => {
	const response = await fetchApi<{ name: string; content: string }>(
		`slugify/slugs/text-page/${textPageSlug}`,
	);

	if (!response.data) return notFound();

	const {
		data: {
			attributes: { name, content },
		},
	} = response;

	return <TextPage name={name} content={content} />;
};

export default TextPagePage;
