import { NextResponse } from "next/server";
import { signToken } from "@/utils/auth"; 

const users = [
  {
    userId: "1",
    email: "jose@test.com",
    password: "test",
    role: "admin",
  },
  { userId: "2", email: "gonza@test.com", password: "test", role: "admin" },
  { userId: "3", email: "victor@test.com", password: "test", role: "admin" },
  { userId: "4", email: "toti@test.com", password: "test", role: "user" },
];

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
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
