import { NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { dbConnect } from "@/utils/db-connect";

const normalizeText = (text: string) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "");

export async function GET(request: Request) {
  try {
    console.log("✅ API /api/products alcanzada");
    await dbConnect();

    // Obtener y normalizar el término de búsqueda desde los parámetros de la URL
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const normalizedQuery = normalizeText(searchQuery);

    // Si hay un término de búsqueda, filtrar los productos por nombre normalizado
    const filter = normalizedQuery
      ? {
          // Usamos un $expr para aplicar la normalización en una comparación de strings
          $expr: {
            $regexMatch: {
              input: {
                $replaceAll: {
                  input: {
                    $replaceAll: {
                      input: {
                        $replaceAll: {
                          input: "$name",
                          find: "á",
                          replacement: "a",
                        },
                      },
                      find: "é",
                      replacement: "e",
                    },
                  },
                  find: "í",
                  replacement: "i",
                },
              },
              regex: normalizedQuery,
              options: "i",
            },
          },
        }
      : {};

    const products = await ProductModel.find(filter);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al traer productos:", error);
    return NextResponse.json(
      { message: "Error al traer productos" },
      { status: 500 }
    );
  }
}
