import { Container, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import ImageCard from "./Card";
import { Box } from "@mui/system";

const Gallery = ({ images }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: "1rem" }}>
      <Grid container spacing={2}>
        {images.length > 0 &&
          images.map((img) => (
            <Grid key={img.id} item xs={12} md={6} lg={4}>
              <ImageCard photographer={img.photographer} url={img.src.large} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
