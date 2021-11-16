import { configureStore } from "@reduxjs/toolkit";
import GalleryReducer from "./features/GallerySlice";

export default configureStore({
  reducer: {
    Gallery: GalleryReducer,
  },
});
