import { useState } from "react";

export const MainView = () => {
// movieid, title, description, directorid, genreid, imageurl, featured, year
    const [movies, setMovies] = useState([
        {
            movieid: 1,
            title: "Portrait of a Lady on Fire",
            description: "",
            director: "",
            genre:"",
            year:""    
        },
        {
            movieid: 1,
            title: "Portrait of a Lady on Fire",
            description: "",
            director: "",
            genre:"",
            year:""    
        },
        {
            movieid: 1,
            title: "Portrait of a Lady on Fire",
            description: "",
            director: "",
            genre:"",
            year:""    
        },
    ]);

    if (movies.length === 0) {
        return <div>no movies to see</div>;
    }
    else {
    return (
      <div>
        {movies.map((movie) => {
            return <div key = {movie.movieid}>{movie.title}</div>;
    })}
      </div>
    );
    }
  };