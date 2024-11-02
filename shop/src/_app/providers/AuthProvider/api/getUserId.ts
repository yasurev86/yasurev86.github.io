import axios from 'axios';

export async function getUserId() {
	const res = await axios('/api/auth/me');
	return res.data.userId;
}
