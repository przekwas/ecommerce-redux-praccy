import jwt from 'jsonwebtoken';
import { config } from '../config';

const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRES_IN = config.jwt.expires;

/**
 * Generates a new JSON Web Token.
 * @param payload - The payload to encode in the JWT.
 * @returns A promise that resolves to the generated token.
 */
export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JSON Web Token and returns the decoded payload.
 * @param token - The token to verify.
 * @returns A promise that resolves to the decoded payload if the token is valid.
 */
export function verifyToken(token: string): Promise<object | string> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded as object);
        });
    });
}
