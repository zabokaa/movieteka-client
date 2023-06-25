import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import {Link} from "react-router-dom"

export const MovieCard = ({ movie}) => {
  return (
    <Container>

      <Card
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
          <Card.Text className="align-items-center">{movie.year}</Card.Text>
        </Card.Body>
        <Link to={`/movies/${movie.id}`}>
          <Button className="button-find">more..</Button>
        </Link>
      </Card>

    </Container>

  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

// if create export default -> no need for {} at import 
// export default MovieCard;   