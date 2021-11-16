import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GallerySlice = createSlice({
  name: "gallery",
  initialState: {
    loading: false,
    results: [],
    total_results: 0,
  },

  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.results = action.payload.photos;
      state.loading = false;
      state.total_results = action.payload.total_results;
    },
    error: (state, action) => {
      state.loading = false;
    },
  },
});

export const { request, success, error } = GallerySlice.actions;

export const fetchImages =
  (page, limit, input = "") =>
  async (dispatch) => {
    let url = input
      ? `https://api.pexels.com/v1/search?query=${input}?page=${page}&per_page=${limit}`
      : `https://api.pexels.com/v1/curated?page=${page}&per_page=${limit}`;

    try {
      dispatch(request());

      const { data } = await axios.get(url, {
        headers: {
          Authorization: process.env.REACT_APP_SECRET_API,
        },
      });

      dispatch(
        success({
          photos: data.photos,
          total_results: data.total_results ? data.total_results : 100,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(error());
    }
  };

export const getGallery = (state) => state.Gallery;

export default GallerySlice.reducer;
