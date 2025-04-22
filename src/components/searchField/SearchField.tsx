"use client";

import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

function SearchField() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="px-4 py-2 w-2/3 flex justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          placeholder="Buscar productos..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white text-gray"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            borderRadius: "1.5rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.5rem",
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
              "& input": {
                backgroundColor: "transparent !important",
                transition: "background-color 9999s ease-in-out 0s",
              },
            },
          }}
        />
      </form>
    </div>
  );
}

export default SearchField;
