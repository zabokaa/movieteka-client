import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap";


export const MovieView = ({ movie, onBackClick, movies }) => {
  const [sameDirector, setSameDirector] = useState([]);
  const sameDirectorClick = () => {
    const moviesSameDirector = movies.filter(
      (m) => m.director === movie.director
    );
    setSameDirector(moviesSameDirector);
  };

  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span className="kat" > title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span className="kat" >genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span className="kat" >year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span className="kat" >description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span className="kat" >director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span className="kat" >born: </span>
        <span>{movie.byear}</span>
      </div>
      <div>
        <span className="kat" >gender: </span>
        <span>{movie.gender}</span>
      </div>
      <div>
        <span className="kat" >bio: </span>
        <span>{movie.bio}</span>
      </div>

      <Button className="button-find" onClick={sameDirectorClick}>find movies</Button>
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
      <Button className="button" onClick={onBackClick}>Back</Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};