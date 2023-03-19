// import jwt, { SignOptions } from "jsonwebtoken";
import jwt, { SignOptions } from "jsonwebtoken";
const accessTokenPrivateKey: string = "";
const accessTokenPublicKey: string = "";

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
