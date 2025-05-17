import jwt from "jsonwebtoken";

const JWT_SECRET = "test";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function getUserFromToken(token: string) {
  return verifyToken(token);
} 
