import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types"; 

export const MainView = () => {
// movieid, title, description, directorid, genreid, imageurl, featured, year
    const [movies, setMovies] = useState([ ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    // use effect hook:
    useEffect(() => {
      fetch("https://movieteka-zabokaa.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const moviesFromAPI = data.map((movie) => ({
              id: movie.movieid,
              title: movie.title,
              director: movie.director,
              description: movie.description,
              genre: movie.genre,
              year: movie.year
            }));
            setMovies(moviesFromAPI);
          }
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          );
      }
      
    if (movies.length === 0) {
        return <div>no movies to see</div>;
      }
      
    return (
        
        <div>
          <h2>Welcome to MOVIETEKA</h2>
          {movies.map((movie) => (
            <MovieCard
              key={movie.movieid}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
    );
}