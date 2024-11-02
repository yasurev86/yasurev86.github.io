import { stringify } from 'qs';

export const dynamic = 'force-dynamic'; // defaults to auto
import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(
	request: NextRequest,
	{ params }: { params: { provider: string; type: 'connect' | 'auth' } },
) {
	const { provider, type } = params;

	if (!type || ['connect', 'auth'].indexOf(type) == -1)
		return new Response('Incorrect type', {
			status: 400,
		});

	const searchParams = request.nextUrl.searchParams;
	const pathname = searchParams.get('pathname');
	const remember = searchParams.get('remember');

	switch (provider) {
		case 'google': {
			const params = {
				response_type: 'code',
				client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
				redirect_uri:
					type == 'connect'
						? process.env.GOOGLE_CONNECT_REDIRECT_URI
						: process.env.GOOGLE_AUTH_REDIRECT_URI,
				scope: 'email profile',
				state: JSON.stringify({ pathname, remember }),
				// TODO: state
			};
			redirect(
				`https://accounts.google.com/o/oauth2/v2/auth?${stringify(params)}`,
			);
		}
	}
}
