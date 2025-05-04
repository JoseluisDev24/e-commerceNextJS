import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  offer: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    offer: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = models.Product || model<Product>("Product", schema);
export default ProductModel;
