import { NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { dbConnect } from "@/utils/db-connect";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await dbConnect();
    const product = await ProductModel.findOne({ id });

    if (!product) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json(
      { message: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}
