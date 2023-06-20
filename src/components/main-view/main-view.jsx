import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import PropTypes from "prop-types"; 

export const MainView = () => {
// movieid, title, description, directorid, genreid, imageurl, featured, year
  const [movies, setMovies] = useState([ ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

    // use effect hook:
    useEffect(() => {
      if (!token) {
        return;
      }
      fetch("https://movieteka-zabokaa.herokuapp.com/movies", 
      { headers: {Authorization: `Bearer ${token}`}})
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const moviesFromAPI = data.map((movie) => ({
              id: movie._id,
              title: movie.title,
              director: movie.director.name,
              description: movie.description,
              genre: movie.genre.name,
              year: movie.year
            }));
            setMovies(moviesFromAPI);
          }
        } , [token])
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }, []);

    // loginView:
    if (!user) {
        return (
            <LoginView  
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} 
              /> );
    };

    if (selectedMovie) {
        return (
            <MovieView 
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
              movies={movies}  //array as a prop f movieView
              />
          );
      }
      
    if (movies.length === 0) {
        return <div>no movies to see</div>;
      }
      
    return (
       <>
        <div>
          <h2>Welcome to MOVIETEKA</h2>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
          <button onClick={ () => { setUser(null); setToken(null)}}>logout</button>
        </div>      
      </>
    );
}