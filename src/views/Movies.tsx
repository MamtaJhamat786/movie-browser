import React, { useState, useCallback, useEffect } from "react";
import { Pagination } from "@mui/material";
import { useDebounce } from "use-debounce";
import { DEBOUNCE_DELAY } from "../constants"
import { useGetAllMovies } from "../apis/hooks/useGetAllMovies";
import ErrorBoundary from "../components/ErrorBoundary";
import MovieList from "../components/MovieList";
import "../styles.scss";

const Movies: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>(String(page)); // Local state for input
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  const [debouncedPageInput] = useDebounce(pageInput, DEBOUNCE_DELAY);
  const { data, isLoading, isError } = useGetAllMovies(debouncedSearch, Number(debouncedPageInput) || 1);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
    setPage(1); // Reset to first page on new search
  }, []);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageInput(String(value)); // Sync input with page state
  }, []);

  const handleTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPageInput(value); // Clear the input field
      setPage(1); // Reset page to 1 when input is cleared
    } else {
      const pageNumber = Number(value);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= (data?.total_pages || 1)) {
        setPage(pageNumber);
        setPageInput(value); // Update pageInput only when the value is valid
      }
    }
  }, [data?.total_pages]);

  useEffect(() => {
    setPageInput(String(page)); // Sync input with page state on data change
  }, [page]);

  return (
    <ErrorBoundary fallback={<p>We could not find any movies. Please try again later.</p>}>
      <div className="flex-col gap-10 movies-container">
        <span>List of Movies</span>
        <input
          className="field-input"
          value={search}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Search movie"
        />
        <MovieList isError={isError} isLoading={isLoading} data={data} />
        <div className="flex gap-10 mt-10 justify-center">
          <Pagination count={data?.total_pages} page={page} onChange={handlePageChange} />
          <input
            className="field-input"
            type="number"
            value={pageInput}
            min={1}
            max={data?.total_pages || 1}
            onChange={handleTextFieldChange}
            autoComplete="off"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Movies);
