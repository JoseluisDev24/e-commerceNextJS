"use client"

import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"


function SearchField() {
    
    return (
      <div className="flex justify-center items-center gap-x-4">
        <TextField
          fullWidth
          type="text"
          placeholder="Search product..."
          size="small"
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
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "darkblue",
              },
            },
          }}
        />
      </div>
    );
}

export default SearchField
