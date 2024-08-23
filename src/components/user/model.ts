import { CallbackError, model, Model, Schema } from "mongoose";
import { IUser } from "./classes";
import bcrypt from 'bcrypt';


const schema: Schema<IUser> = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        required: true,
        unique: true,
        type: String,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex pattern for email validation
    },
    phone: {
        required: true,
        type: Number
    },
    password: {
        require: true,
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

// Middleware to hash the password before saving
schema.pre('save', async function (next: (err?: CallbackError) => void) {
    const user = this as any; // Use `as any` to bypass TypeScript's type checks

    if (!user.isModified('password')) return next();

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err: any) {
        next(err);
    }
});

schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;
    return userObject;
};

const User: Model<IUser> = model('User', schema);

export default User;
