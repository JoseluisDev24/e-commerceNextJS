import "dotenv/config"; // 👈 IMPORTANTE
import { dbConnect } from "@/utils/db-connect";
import ProductModel from "@/models/product.model";
import data from "@/data.json";
import mongoose from "mongoose";

async function loadProductsDB() {
  try {
    await dbConnect();

    await ProductModel.deleteMany({});
    console.log("🧹 Productos anteriores borrados");

    await ProductModel.insertMany(data);
    console.log("✅ Productos insertados correctamente");
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

loadProductsDB();
