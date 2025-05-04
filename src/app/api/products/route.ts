import { NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { dbConnect } from "@/utils/db-connect";

export async function GET() {
  try {
    await dbConnect();

    const products = await ProductModel.find();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al traer productos:", error);
    return NextResponse.json(
      { message: "Error al traer productos" },
      { status: 500 }
    );
  }
}
