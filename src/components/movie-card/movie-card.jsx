import PropTypes from "prop-types"; 
import { Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card
        onClick={() => 
          onMovieClick(movie)
        }
      >
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
        </Card.Body>
      </Card>

    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  }; 

  export default MovieCard;