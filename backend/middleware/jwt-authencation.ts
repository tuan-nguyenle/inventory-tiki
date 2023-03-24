import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accessTokenPrivateKey: string = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
const accessTokenPublicKey: string = process.env.ACCESS_TOKEN_PUBLIC_KEY!;

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(accessTokenPrivateKey, "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(accessTokenPublicKey, "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
