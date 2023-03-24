import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenPrivateKey: string = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
const accessTokenPublicKey: string = process.env.ACCESS_TOKEN_PUBLIC_KEY!;
const refreshTokenPrivateKey: string = process.env.REFRESH_TOKEN_PRIVATE_KEY!;
const refreshTokenPublicKey: string = process.env.REFRESH_TOKEN_PUBLIC_KEY!;

export const signRefreshToken = (payload: Object, options: SignOptions) => {
  const privateRefreshKey = Buffer.from(
    refreshTokenPrivateKey,
    "base64"
  ).toString("ascii");
  return jwt.sign(payload, privateRefreshKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyRefreshToken = (payload: Object, options: SignOptions) => {
  const publicRefreshKey = Buffer.from(
    refreshTokenPublicKey,
    "base64"
  ).toString("ascii");
  return jwt.sign(payload, publicRefreshKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

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
