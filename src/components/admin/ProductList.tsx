import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from "@mui/material";
import { Product } from "@/queries/products";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({
  products,
  loading,
  error,
  onEdit,
  onDelete,
}: ProductListProps) => {
  return (
    <Box sx={{ flex: 2, width: "100%", overflowX: "auto" }}>
      <Typography variant="h6" mb={2} fontSize="1.2rem">
        Lista de Productos
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Oferta</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.offer ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    <EditIcon
                      color="primary"
                      onClick={() => onEdit(product)}
                      sx={{ cursor: "pointer", marginRight: 1 }}
                    />
                    <DeleteIcon
                      color="error"
                      onClick={() => onDelete(product.id)}
                      sx={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductList;
