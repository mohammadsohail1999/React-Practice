import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ImageIcon from '@mui/icons-material/Image';



export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{background:"#aa647b"}} position="static">
        <Toolbar  >
          <Typography sx={{color:"#ce93d8"}} display="flex" alignItems="center" justifyContent="center" variant="h6" component="div">
            Gallery <ImageIcon/>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
