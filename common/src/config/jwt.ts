import jwt, { SignOptions } from "jsonwebtoken";
// RS256 require file .pem and file .pem was generator by server

const accessTokenPrivateKey: string =
  "c887fcf40707a1c6f10e09687d933871e94a5698cd4f9cc4504033d31a63cd0d";
// const accessTokenPublicKey: string = process.env.ACCESS_TOKEN_PUBLIC_KEY!;

export const signJwt = (payload: Object, options: SignOptions) => {
  const privateKey = Buffer.from(accessTokenPrivateKey, "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "HS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(accessTokenPrivateKey, "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
