import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
// movieid, title, description, directorid, genreid, imageurl, featured, year
    const [movies, setMovies] = useState([ ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    // use effect hook:
    useEffect(() => {
      fetch("https://movieteka-zabokaa.herokuapp.com/movies")
        .then((response) => response.json())
        .then ((data) => {
          console.log("movies array:", data);
        })
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