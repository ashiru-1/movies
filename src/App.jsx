import { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'http://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const DEFAULT_QUERY = 'Marvel'; // Change this to any default search term

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search input
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage('');
    setMovieList([]); // Reset movie list before fetching

    try {
      let allMovies = [];
      let page = 1;
      let totalResults = 0;

      do {
        const endpoint = `${API_BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.Response === 'False') {
          setErrorMessage('No matching movies found.');
          setMovieList([]);
          return;
        }

        allMovies = [...allMovies, ...data.Search];
        totalResults = parseInt(data.totalResults) || 0;
        page++;
      } while (allMovies.length < totalResults && page <= 5); // Fetch up to 50 movies max

      setMovieList(allMovies);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === '') {
      fetchMovies(debouncedSearchTerm || DEFAULT_QUERY); // Use default query on first load
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies(DEFAULT_QUERY); // Load default movies on startup
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
