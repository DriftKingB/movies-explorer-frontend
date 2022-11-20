export default function useMoviesFilter({ movies = [], keyWord = '', shortsChecked = 'unsettled' }) {
  let filteredMovies = [];

  movies.forEach(movie => {
    const matchesKeyWord = movie.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyWord.toLowerCase());
    const matchesShorts = shortsChecked ? (movie.duration <= 40 || shortsChecked === 'unsettled') : (movie.duration > 40);

    if (matchesKeyWord && matchesShorts) {
      filteredMovies = [ ...filteredMovies, movie ];
    }
  });

  return filteredMovies
}