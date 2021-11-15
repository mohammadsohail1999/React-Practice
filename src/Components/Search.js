import { Container, Input } from "@mui/material";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Search = ({ setSearch, setPage }) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Container maxWidth="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setSearch(searchInput);
          setSearchInput("");
        }}
      >
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-around"
        >
          <Input
            sx={{ width: "80%", background: "#fff", padding: "10px " }}
            placeholder="Search Images"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            Search
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Search;
