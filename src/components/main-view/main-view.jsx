import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
// movieid, title, description, directorid, genreid, imageurl, featured, year
    const [movies, setMovies] = useState([
        {
            movieid: 1,
            title: "Portrait of a Lady on Fire",
            description: "In late 18th century France, painter Marianne is commissioned by a countess to paint the wedding portrait of her daughter Héloïse. While posing as her hired companion, Marianne is instructed to complete the portrait in secret. However, intimacy and attraction begin to blossom between both women.",
            director: "Céline Sciamma",
            genre: "drama",
            imageurl: "https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY132_CR0,0,89,132_AL_.jpg",
            year: "2019"    
        },
        {
            movieid: 2,
            title: "Rafiki",
            description: "Despite the political rivalry between their families, Kena and Ziki resist and remain close friends, supporting each other to pursue their dreams in a conservative society. When love blossoms between them, the two girls will be forced to choose between happiness and safety.",
            director: "Wanuri Kahiu",
            genre: "drama",
            imageurl: "https://assets.cdn.moviepilot.de/files/559622d60cb835d8019aa922bb8c57fdf47d328bdb07f30a1809d7f2d05c/fill/136/195/rafiki300.jpg",
            year: "2018"    
        },
        {
            movieid: 3,
            title: "Titane",
            description: "Alexia is a dancer who, after being injured in a car accident as a child, has a titanium plate fitted into her head. Amidst a series of brutal and unexplained murders, her path crosses with Vincent, a firefighter desperately searching for his long-missing son, changing their lives forever.",
            director: "Julia Ducournau",
            genre: "thriller",
            imageurl: "https://www.jposter.net/images/products/thumbs/b5-titane-th.jpg",
            year: "2021"    
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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