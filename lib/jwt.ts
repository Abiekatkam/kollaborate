import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const SECRET_KEY: any = String(process.env.JWT_SECRET || "");

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export function GENERATE_JWT_TOKEN(payload: object, expiresIn: number = 10 * 60): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function AUTHORISED_JWT_TOKEN(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error("Token verification failed:", (err as Error).message);
    return null;
  }
}
