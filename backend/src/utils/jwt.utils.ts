import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET as string;
const verificationTokenSecret=process.env.JWT_VERIFICATION_SECRET as string;

// Generate Access Token (Short-lived)
export const generateAccessToken = (email: string) => {
  return jwt.sign({ email }, accessTokenSecret, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
};

// Generate Refresh Token (Long-lived)
export const generateRefreshToken = (email: string) => {
  return jwt.sign({ email }, refreshTokenSecret, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
}; 

export const generateVerificationToken = (email: string) => {
  return jwt.sign({ email }, verificationTokenSecret, { expiresIn: process.env.JWT_VERIFICATION_EXPIRE });
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

export const verifyVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, verificationTokenSecret);
  } catch (error: any) {
    console.error("JWT Verification Failed:", error.message);
    return null; 
  }
};