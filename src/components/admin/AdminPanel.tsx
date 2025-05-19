"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ProductForm from "@/components/products/ProductForm";
import { useProducts } from "@/queries/products";
import { Product } from "@/types/product";
import { deleteProduct } from "@/api/products";
import ProductList from "@/components/admin/ProductList";

const AdminPage = () => {
  const { products, loading, error, refetch } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleFormSubmit = () => {
    refetch();
    setEditingProduct(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3} fontSize="1.8rem">
        Panel de Administración
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
          <ProductForm
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            onSuccess={handleFormSubmit}
          />
        </Box>

        <ProductList
          products={products}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
};

export default AdminPage;
