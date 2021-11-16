import "./App.css";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Gallery from "./Components/Gallery";
import { theme } from "./utilities/theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, getGallery } from "./features/GallerySlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paginateWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
});

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { loading, results, total_results } = useSelector(getGallery);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchImages(page, limit, search));
  }, [page, limit, search]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          marginTop: "30px",
        }}
      >
        <Search search={search} setSearch={setSearch} setPage={setPage} />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              height: "50vh",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Gallery images={results} />
          </>
        )}

        {total_results ? (
          <Box marginTop={10} className={classes.paginateWrapper}>
            <Pagination
              color="secondary"
              onChange={(e, value) => {
                setPage(value);
              }}
              page={page}
              count={total_results / limit}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                label="limit"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default App;
