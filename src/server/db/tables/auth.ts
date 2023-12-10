import { verifyToken } from '../../utils/jwt';

export const auth = {
	verifyToken(jwt: string) {
		const verified = verifyToken(jwt);
		return verified;
	}
};
