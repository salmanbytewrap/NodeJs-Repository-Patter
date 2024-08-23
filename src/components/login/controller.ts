import { createToken } from '../../helpers/jwtHelper';
import { Request, Response } from 'express';
import User from '../user/model';
import bcrypt from 'bcrypt';
import { IUser } from '../user/classes';
import { ResponseError, ResponseSuccess } from '../../utils/response';
import { comparePasswords, decodeBasicAuth } from '../../utils/authUtils';

export let login = async (req: Request, res: Response) => {
    const authHeader: any = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(400).send(new ResponseError({ error: "Please enter your email and password." }));
    }

    const credentials = decodeBasicAuth(authHeader);
    if (!credentials) {
        return res.status(400).send(new ResponseError({ error: "Invalid authorization format." }));
    }

    const { email, password } = credentials;
    const data = authHeader.split("Basic");

    try {
        const user = await User.findOne({ email }) as IUser;
        if (!user) {
            return res.status(400).send(new ResponseError({ message: "Invalid email or password" }));
        }

        const isPasswordMatch = await comparePasswords(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send(new ResponseError({ message: "Invalid email or password" }));
        }

        const payload = { email, id: user._id };
        const token = await createToken(payload);

        return res.status(200).send(new ResponseSuccess({ data: { token } }));
    } catch (error) {
        return res.status(500).send(new ResponseError({
            message: error instanceof Error ? error.message : "An error occurred"
        }));
    }
}