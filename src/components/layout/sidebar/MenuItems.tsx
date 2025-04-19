import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const menuItems = [
  { label: "Inicio", icon: <HomeOutlinedIcon />, href: "/" },
  { label: "Pedidos", icon: <LocalShippingOutlinedIcon />, href: "/orders" },
  { label: "Carrito", icon: <ShoppingCartOutlinedIcon />, href: "/cart" },
  { label: "Favoritos", icon: <FavoriteBorderIcon/> , href: "/favorites" },
  { label: "Perfil", icon: <PersonOutlineOutlinedIcon />, href: "/login" },
  { label: "Sobre nosotros", icon: <InfoOutlinedIcon />, href: "/about" },
  { label: "Configuración", icon: <SettingsOutlinedIcon />, href: "/settings" },
];
