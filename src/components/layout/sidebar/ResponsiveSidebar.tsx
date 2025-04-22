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
import { menuItems } from "./MenuItems";
import Link from "next/link";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const ResponsiveSidebar = ({ open, toggleDrawer }: Props) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Box
        sx={{
          width: 240,
          pt: 8,
        }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              sx={{ px: 2 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
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
