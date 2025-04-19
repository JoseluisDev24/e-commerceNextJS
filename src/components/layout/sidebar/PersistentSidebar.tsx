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
import { menuItems } from "./MenuItems";

const PersistentSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
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
        pt: 8,
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
