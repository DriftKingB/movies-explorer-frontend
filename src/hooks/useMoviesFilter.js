import { shortsMaxDuration } from "../utils/constants";

export default function useMoviesFilter({ movies = [], keyWord = '', shortsChecked = false }) {
  let filteredMovies = [];

  movies.forEach(movie => {
    const matchesKeyWord =
      movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
      || movie.nameEN.toLowerCase().includes(keyWord.toLowerCase());

    const matchesShorts = shortsChecked
      ? (movie.duration <= shortsMaxDuration)
      : (movie.duration > shortsMaxDuration);

    if (matchesKeyWord && matchesShorts) {
      filteredMovies = [ ...filteredMovies, movie ];
    }
  });

  return filteredMovies
}