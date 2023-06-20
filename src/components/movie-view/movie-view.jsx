import PropTypes from "prop-types"; 
import { useState } from "react";

export const MovieView = ({ movie , onBackClick, movies }) => {
    const [sameDirector, setSameDirector] = useState([ ]);
    const sameDirectorClick = () => {
      const moviesSameDirector = movies.filter(
        (m) => m.director === movie.director
      );
      setSameDirector(moviesSameDirector);
    };

    return (
      <div>
        <div>
          <span>title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>year: </span>
          <span>{movie.year}</span>
        </div>
        <button onClick={sameDirectorClick}>find movies</button>
          {sameDirector.length > 0 && (
          <div>
            <h3>movies from same director:</h3>
              {sameDirector.map((movie) => (
              <div key={movie.id}>
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };

  MovieView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };