export const getAvatar = (url: string | undefined) => {
	return url
		? url.includes('http')
			? url
			: process.env.NEXT_PUBLIC_STRAPI_URL + '/uploads/' + url
		: '/assets/images/shared/avatars/1.png';
};
