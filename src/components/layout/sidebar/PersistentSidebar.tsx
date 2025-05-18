"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "./MenuItems";

const PersistentSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: isCollapsed ? 72 : 240,
        bgcolor: "white",
        color: "black",
        borderRight: "1px solid #e0e0e0",
        transition: "width 0.3s ease",
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        zIndex: 1200,
        pt: {
          sm: 0,
          md: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}

        <Divider sx={{ my: 1 }} />

        {!isAuthenticated ? (
          <ListItemButton
            component={Link}
            href="/login"
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              <PersonOutlineOutlinedIcon aria-hidden="true" />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Iniciar sesión" />}
          </ListItemButton>
        ) : (
          <>
            <ListItemButton
              component={Link}
              href="/profile"
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                <PersonOutlineOutlinedIcon aria-hidden="true" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Perfil" />}
            </ListItemButton>

            <ListItemButton
              component={Link}
              href="/settings"
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                <SettingsOutlinedIcon aria-hidden="true" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Configuración" />}
            </ListItemButton>

            {user?.role === "admin" && (
              <ListItemButton
                component={Link}
                href="/admin"
                sx={{
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 2,
                    justifyContent: "center",
                  }}
                >
                  <AdminPanelSettingsIcon aria-hidden="true" />
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary="Admin" />}
              </ListItemButton>
            )}

            <ListItemButton
              onClick={handleLogout}
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: "center",
                }}
              >
                <LogoutIcon aria-hidden="true" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Cerrar sesión" />}
            </ListItemButton>
          </>
        )}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: isCollapsed ? "center" : "flex-end",
        }}
      >
        <IconButton onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default PersistentSidebar;
