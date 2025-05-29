import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import dbConnect from "@/utils/db-connect";

const normalizeText = (text: string) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "");

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const normalizedQuery = normalizeText(searchQuery);

    const filter = normalizedQuery
      ? {
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
    return NextResponse.json(
      { message: "Error al traer productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (body._id === "") {
      delete body._id;
    }

    const newProduct = await ProductModel.create(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear producto" },
      { status: 500 }
    );
  }
}
