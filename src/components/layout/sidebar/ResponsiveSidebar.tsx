import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "./MenuItems";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const ResponsiveSidebar = ({ open, toggleDrawer }: Props) => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{ keepMounted: false }}
      sx={{
        "& .MuiDrawer-root": {
          // No usamos pointerEvents, solo controlamos inert
        },
      }}
    >
      <Box
        sx={{ width: 240, pt: 8 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        {...(open ? {} : { datainert: "true" })}
      >
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              sx={{ px: 2 }}
            >
              <ListItemIcon>
                <span>{item.icon}</span>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />

          {!isAuthenticated ? (
            <ListItemButton component={Link} href="/login" sx={{ px: 2 }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Iniciar sesión" />
            </ListItemButton>
          ) : (
            <>
              <ListItemButton component={Link} href="/profile" sx={{ px: 2 }}>
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>

              <ListItemButton component={Link} href="/settings" sx={{ px: 2 }}>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Configuración" />
              </ListItemButton>

              <ListItemButton onClick={handleLogout} sx={{ px: 2 }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </>
          )}
        </List>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ResponsiveSidebar;
