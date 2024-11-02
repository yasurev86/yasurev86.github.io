import jwt from 'jsonwebtoken';
import axios from 'axios';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
	const Cookies = cookies();

	const token = Cookies.get('token')?.value;
	const refreshToken = Cookies.get('refreshToken')?.value;

	try {
		if (!token || !process.env.JWT_SECRET) throw null;

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (typeof decoded !== 'string' && 'id' in decoded)
			return Response.json({ userId: decoded.id as string, error: '' });
	} catch (e) {
		if (!refreshToken) return Response.json({ user: {}, error: e });
		try {
			const res = await axios.post(
				process.env.STRAPI_API_URL + 'token/refresh',
				{
					refreshToken: refreshToken,
				},
			);

			return Response.json(
				{ userId: res.data.user.id, error: '' },
				{
					headers: new Headers([
						['Set-Cookie', `token=${res.data.token};path=/`],
						[
							'Set-Cookie',
							`refreshToken=${res.data.refreshToken};path=/;httpOnly`,
						],
					]),
				},
			);
		} catch (e) {
			return Response.json({ user: {}, error: e });
		}
	}
}
