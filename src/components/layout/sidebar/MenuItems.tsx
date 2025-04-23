import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const menuItems = [
  { label: "Inicio", icon: <HomeOutlinedIcon />, href: "/" },
  { label: "Carrito", icon: <ShoppingCartOutlinedIcon />, href: "/cart" },
  { label: "Favoritos", icon: <FavoriteBorderIcon/> , href: "/favorites" },
  { label: "Sobre nosotros", icon: <InfoOutlinedIcon />, href: "/about" },
];
