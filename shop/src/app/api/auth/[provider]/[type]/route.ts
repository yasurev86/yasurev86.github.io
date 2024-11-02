import axios from 'axios';

export const dynamic = 'force-dynamic'; // defaults to auto
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
	request: NextRequest,
	{ params }: { params: { provider: string; type: 'connect' | 'auth' } },
) {
	const searchParams = request.nextUrl.searchParams;
	const { provider, type } = params;

	if (!type || ['connect', 'auth'].indexOf(type) == -1)
		return new Response('Incorrect type', {
			status: 400,
		});

	const code = searchParams.get('code');
	const { pathname, remember } = JSON.parse(
		searchParams.get('state') ?? '{}',
	);

	let provider_data;

	switch (provider) {
		case 'google': {
			const tokenResponse = await axios.post(
				'https://oauth2.googleapis.com/token',
				{
					grant_type: 'authorization_code',
					client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
					client_secret: process.env.GOOGLE_CLIENT_SECRET,
					redirect_uri:
						type == 'connect'
							? process.env.GOOGLE_CONNECT_REDIRECT_URI
							: process.env.GOOGLE_AUTH_REDIRECT_URI,
					code,
				},
			);
			provider_data = { id_token: tokenResponse.data.id_token };
			break;
		}
	}

	const cookiesToken = cookies().get('token')?.value;

	const response = await axios
		.post(
			process.env.STRAPI_API_URL +
				`auth/${provider}${type == 'connect' ? '/connect' : ''}`,
			{
				type,
				provider_data,
				remember,
			},
			type == 'connect'
				? {
						headers: {
							Authorization: `Bearer ${cookiesToken}`,
						},
					}
				: {},
		)
		.catch(err => err);

	const res = NextResponse.redirect(
		new URL(process.env.SITE_URL + pathname, request.nextUrl),
	);

	const { token, token_maxAge, refreshToken, refreshToken_maxAge } =
		response.data;

	if (type !== 'connect') {
		res.headers.append(
			'Set-Cookie',
			`token=${token};path=/;Max-Age=${token_maxAge}`,
		);
		if (refreshToken) {
			res.headers.append(
				'Set-Cookie',
				`refreshToken=${refreshToken};path=/;httpOnly;Max-Age=${refreshToken_maxAge}`,
			);
		}
	}

	return res;
}
