import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("Ya estás conectado a la base de datos.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("Conexión a MongoDB exitosa!");
    } else {
      console.log("Error en la conexión a MongoDB.");
    }
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw new Error("Error de conexión a MongoDB.");
  }
};
