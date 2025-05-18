import { Schema, model, models, Document } from "mongoose";
import { Product } from "../types/product";

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

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString(); 
    delete ret._id; 
  },
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel;
