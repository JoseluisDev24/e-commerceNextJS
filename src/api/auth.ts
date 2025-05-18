import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import {users} from "@/data/users";

const JWT_SECRET = process.env.JWT_KEY || "test";

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Token inválido");
  }
}



export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const token = signToken({
    userId: user.userId,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ message: "Login exitoso" });
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
