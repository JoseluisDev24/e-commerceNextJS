import { Schema, model, models, Document } from "mongoose";
import { Product } from "../types/product";

// Creamos un tipo de documento excluyendo "id", ya que Mongoose usa "_id"
type ProductDocument = Omit<Product, "id"> & Document;

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    offer: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// Al convertir a JSON, incluir "id" (desde "_id") y eliminar "_id" y "__v"
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString(); // agregamos el id como string
    delete ret._id; // eliminamos el campo _id
  },
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel;
