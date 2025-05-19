"use client";

import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createProduct, updateProduct } from "@/api/products";
import { CreateProductInput, Product } from "@/types/product";

interface Props {
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onSuccess: () => void;
}

const ProductForm: React.FC<Props> = ({ editingProduct, onSuccess }) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CreateProductInput>({
    name: "",
    image: "",
    description: "",
    price: 0,
    quantity: 0,
    offer: false,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        image: editingProduct.image || "",
        description: editingProduct.description,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        offer: editingProduct.offer,
      });

      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setFormData({
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 0,
        offer: false,
      });
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }

      onSuccess();

      if (!editingProduct) {
        setFormData({
          name: "",
          image: "",
          description: "",
          price: 0,
          quantity: 0,
          offer: false,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleCancel = () => {
    onSuccess(); 
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      ref={formRef} 
    >
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {editingProduct ? "Editar Producto" : "Agregar Producto"}
          </Typography>

          {editingProduct && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          )}
        </Box>
      )}

      {isMobile && (
        <Typography variant="h6" mb={1}>
          {editingProduct ? "Editar Producto" : "Agregar Producto"}
        </Typography>
      )}

      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
      />

      <TextField
        label="Precio"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <TextField
        label="Cantidad"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.offer}
            onChange={handleChange}
            name="offer"
          />
        }
        label="¿Está en oferta?"
      />

      <TextField
        label="URL de la imagen"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://..."
        required
      />

      {formData.image && (
        <Box>
          <img
            src={formData.image}
            alt="Vista previa"
            style={{ maxWidth: "100%", maxHeight: 200, marginTop: 8 }}
            width={200}
            height={200}
          />
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {editingProduct ? "Actualizar" : "Agregar"}
      </Button>

      {isMobile && editingProduct && (
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={handleCancel}
          sx={{ mt: 1 }}
        >
          Cancelar
        </Button>
      )}
    </Box>
  );
};

export default ProductForm;
