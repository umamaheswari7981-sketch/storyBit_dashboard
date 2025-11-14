# TODO: Add Retry Logic to TMDB Fetch Functions

- [x] Add a retry helper function in `lib/tmdb.ts` to handle transient network errors like ECONNRESET.
- [x] Modify `fetchMovieList` to use the retry logic.
- [x] Modify `fetchMovieById` to use the retry logic.
- [x] Test the changes to ensure retries work and errors are handled gracefully.
