import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
const ImageCard = ({ photographer, url }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ background: "lightgreen" }}>{photographer[0]}</Avatar>}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={photographer}
      />

      <CardMedia
        component="img"
        height="300px"
        style={{ objectFit: "fill" }}
        image={url}
        alt="imagepexel"
      />
      <CardActions>
        <Button size="small">Mark As Favorite</Button>
      </CardActions>
    </Card>
  );
};

export default ImageCard;
