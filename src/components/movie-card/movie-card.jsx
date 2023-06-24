import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Container>

      <Card
        onClick={() =>
          onMovieClick(movie)
        }
        className="align-items-center"
        style={{ marginTop: 50}}
      >
        <Card.Img
          variant="top"
          src={movie.image}
          style={{ width: "200px", height: "300px" }}
          rounded

        />
        <Card.Body >
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.year}</Card.Text>
        </Card.Body>
      </Card>

    </Container>

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