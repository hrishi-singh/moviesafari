import { useEffect, useState } from "react";
// API: 757ce241
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=757ce241";

const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchmovie,setSearchmovie]=useState('');
  const [flag,setFlag]=useState(0);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.search);
    setmovies(data.Search);
  };
  useEffect(() => {
    searchMovies({searchmovie});
  }, []);
  return (
    <div className="app">
      <h1>MovieSafari</h1>
      <div className="search">
        <input placeholder="search for movies" value={searchmovie} onChange={(e) => setSearchmovie(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() =>{searchMovies(searchmovie); setFlag(1)}} />
      </div>
      {flag && movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
            {(!flag)?(
                ""
            ):
          <h2>No Movies Found.</h2>}
        </div>
      )}
    </div>
  );
};
export default App;
