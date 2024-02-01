import React from "react";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

function Navbar() {
  return (
    <div className="flex bg-black text-white items-center p-3">
      <MovieFilterIcon sx={{ fontSize: 60 }} />
      <p className="text-3xl">Tonight's Double Feature</p>
    </div>
  );
}

export default Navbar;
