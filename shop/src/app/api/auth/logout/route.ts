import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
	try {
		cookies().delete('token');
		cookies().delete('refreshToken');

		return Response.json({ success: true });
	} catch (e) {
		return Response.json({ success: false, error: e });
	}
}
