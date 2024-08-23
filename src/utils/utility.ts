import crypto from 'crypto';

export function generateOTP(): string {
  const otp = crypto.randomInt(100000, 1000000); // Generate a random integer between 100000 (inclusive) and 1000000 (exclusive)
  return otp.toString().padStart(6, '0'); // Ensure OTP is always 6 digits
}


