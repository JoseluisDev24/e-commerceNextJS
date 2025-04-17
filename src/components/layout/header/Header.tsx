"use client";

import { useState, useMemo, useRef } from "react";
import { useShoppingCart } from "@/hooks";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import ResponsiveSidebar from "@/components/layout/sidebar/ResponsiveSidebar";
import SearchField from "../../searchField/SearchField";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);
  const { products } = useShoppingCart();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    router.push("/login");
  };

  const handleGoToSettings = () => {
    handleMenuClose();
    router.push("/settings");
  };

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
    if (!open) {
      setTimeout(() => {
        menuButtonRef.current?.focus();
      }, 100);
    }
  };

  const totalQuantity = useMemo(
    () => products.reduce((total, p) => total + p.quantity, 0),
    [products]
  );

  return (
    <>
      <header className="w-full bg-slate-900 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center relative">
          <div className="flex items-center gap-x-4">
            <div className="md:hidden" ref={menuButtonRef}>
              <MenuIcon
                fontSize="large"
                className="text-white p-1 hover:bg-slate-200/20 rounded-full"
                onClick={() => toggleDrawer(true)}
              />
            </div>
            <Link
              href={"/"}
              className="font-semibold text-2xl sm:text-3xl text-white"
            >
              E.Com
            </Link>
          </div>

          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1/2">
            <SearchField />
          </div>

          <div className="relative flex items-center gap-2">
            <button
              className="hover:bg-slate-200/20 rounded-full p-2 text-white flex items-center gap-1"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCartIcon />
              <div className="bg-white p-1 text-xs text-gray-900 w-6 h-6 rounded-full">
                <span>{totalQuantity}</span>
              </div>
            </button>

            {showCart && (
              <div className="absolute top-12 right-0 w-max z-50">
                <ShoppingCart />
              </div>
            )}

            {!isAuthenticated ? (
              <Button
                sx={{ color: "white" }}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton onClick={handleProfileMenuOpen}>
                  <PersonIcon className="text-white" />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleGoToSettings}>
                    Configuración
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </div>

        <ResponsiveSidebar
          open={openDrawer}
          toggleDrawer={() => toggleDrawer(false)}
        />
      </header>

      <div className="block md:hidden px-4 py-2 bg-gray-900 pb-4 shadow">
        <SearchField />
      </div>
    </>
  );
}
