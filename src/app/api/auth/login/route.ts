import { NextResponse } from "next/server";
import { signToken } from "@/utils/auth";
import { users } from "@/data/users";



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
