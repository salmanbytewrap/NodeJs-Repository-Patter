// src/utils/mailer.ts

import nodemailer from 'nodemailer';
import config from '../../config';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: config.EMAIL_USER, // Your email address
        pass: config.EMAIL_PASS, // Your email password or app password
    },
});

// Define a function to send an email
const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address
            to, // List of recipients
            subject, // Subject line
            text, // Plain text body
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log(error)
    }
}
export default sendEmail
