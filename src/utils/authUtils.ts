// src/utils/authUtils.ts

import bcrypt from 'bcrypt';

/**
 * Decode Basic Auth credentials.
 * @param authHeader - The authorization header.
 * @returns The decoded email and password.
 */
export const decodeBasicAuth = (authHeader: string): { email: string, password: string } | null => {
    const data = authHeader.split("Basic ")[1];
    const decrypt = Buffer.from(data, 'base64').toString();
    if (!decrypt) return null;
    const [email, password] = decrypt.split(":");
    return { email: email.toLowerCase(), password };
};

/**
 * Compare provided password with hashed password.
 * @param providedPassword - The plain password provided by the user.
 * @param hashedPassword - The hashed password from the database.
 * @returns True if passwords match, otherwise false.
 */
export const comparePasswords = async (providedPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(providedPassword, hashedPassword);
};
