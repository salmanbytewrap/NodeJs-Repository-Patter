import { Request, Response } from "express";
import User from "./model";
import { IUser } from "./classes";
import { ResponseError, ResponseSuccess } from "../../utils/response";
import { createToken } from "../../helpers/jwtHelper";
import sendEmail from "../../helpers/Email";
import { generateOTP } from "../../utils/utility";
import UserRepository from "./repository";

class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Find a user by id.
     * uid - The uid of the user to find.
     * @returns The user or null if not found.
     */
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const uid = req.user.id;
            const user = await this.userRepository.findOne(uid);
            const response = new ResponseSuccess({ data: user });
            res.status(200).json(response);
        } catch (error) {
            if (error instanceof Error) {
                const responseError = new ResponseError({ message: error.message });
                res.status(400).json(responseError);
            } else {
                res.status(400).json(new ResponseError({ message: "An error occurred" }));
            }
        }
    }

    /**
     * Create a new user and return the user details and token.
     */
    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, phone, password } = req.body;
            const record: IUser = await this.userRepository.create({ name, email, phone, password } as IUser);

            // const otp = generateOTP();
            // sendEmail(
            //     record.email,
            //     "Welcome to the app",
            //     `welcome ot the app your otp is ${otp}`);

            // Send the token and user details
            const token = await createToken({ id: record._id, email: record.email });
            const response = new ResponseSuccess({
                data: { user: record, token: token },
                message: "User created successfully"
            });
            res.status(201).json(response);
        } catch (error) {
            if (error instanceof Error) {
                const responseError = new ResponseError({ message: error.message });
                res.status(400).json(responseError);
            } else {
                res.status(400).json(new ResponseError({ message: "An error occurred" }));
            }
        }
    }

    /**
     * Verify the email of the user.
     */
    public verifyEmail = async (req: Request, res: Response): Promise<void> => {
        // Implementation here
    }
}














































// import { Request, Response } from "express";
// import User from "./model";
// import { IUser } from "./classes";
// import { ResponseError, ResponseSuccess } from "../../utils/response";
// import { createToken } from "../../helpers/jwtHelper";
// import sendEmail from "../../helpers/Email";
// import { generateOTP } from "../../utils/utility";
// import UserRepository from "./repository";

// const userRepository = new UserRepository();

// /**
//      * Find a user by id.
//      *  uid - The uid of the user to find.
//      * @returns The user or null if not found.
//      */
// export const getUserById = async (req: Request, res: Response) => {
//     try {
//         const uid = req.user.id;
//         const user = await userRepository.findOne(uid);
//         const response = new ResponseSuccess({ data: user });
//         res.status(200).json(response);
//     } catch (error) {
//         if (error instanceof Error) {
//             const responseError = new ResponseError({ message: error.message });
//             res.status(400).json(responseError);
//         } else {
//             res.status(400).json(new ResponseError({ message: "An error occurred" }));
//         }
//     }
// }

// // create a new user and return the user details and token
// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, phone, password } = req.body;
//         const record: IUser = await userRepository.create({ name, email, phone, password } as IUser);
//         // const otp = generateOTP();
//         // sendEmail(
//         //     record.email,
//         //     "Welcome to the app",
//         //     `welcome ot the app your otp is ${otp}`);

//         // send the token and user details
//         const token = await createToken({ id: record._id, email: record.email });
//         const Response = new ResponseSuccess({
//             data: { user: record, token: token },
//             message: "User created successfully"
//         });
//         res.status(201).json(Response);
//     } catch (error) {
//         if (error instanceof Error) {
//             const responseError = new ResponseError({ message: error.message });
//             res.status(400).json(responseError);
//         } else {
//             res.status(400).json(new ResponseError({ message: "An error occurred" }));
//         }
//     }
// }

// // verify the email of the user
// export const verifyEmail = async (req: Request, res: Response) => {

// }
export default UserController;