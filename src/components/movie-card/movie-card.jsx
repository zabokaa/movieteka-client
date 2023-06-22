import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";


export const MovieCard = ({ movie, onMovieClick }) => {
  return (

    <Card
      onClick={() =>
        onMovieClick(movie)
      }
    >
      <Card.Img
        variant="top"
        src={movie.image}
        style={{ width: "200px", height: "300px" }}
        rounded
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.year}</Card.Text>
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

// if create export default -> no need for {} at import 
// export default MovieCard;   