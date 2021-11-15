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

  const [results, setResults] = useState({
    results: [],
    total_results: 0,
    loading: false,
  });

  const classes = useStyles();

  useEffect(() => {
    fetchImages(page, limit);
  }, [page, limit, search]);

  const fetchImages = async (page, limit) => {
    setResults({ ...results, loading: true });

    let url = search
      ? `https://api.pexels.com/v1/search?query=${search}?page=${page}&per_page=${limit}`
      : `https://api.pexels.com/v1/curated?page=${page}&per_page=${limit}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: process.env.REACT_APP_SECRET_API,
      },
    });

    setResults({
      ...results,
      total_results: data.total_results ? data.total_results : 100,
      results: data.photos,
      loading: false,
    });
  };

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

        {results.loading ? (
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
            <Gallery images={results.results} />
          </>
        )}

        {results.total_results ? (
          <Box marginTop={10} className={classes.paginateWrapper}>
            <Pagination
              color="secondary"
              onChange={(e, value) => {
                setPage(value);
              }}
              page={page}
              count={results.total_results / limit}
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
