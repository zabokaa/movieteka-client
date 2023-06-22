import PropTypes from "prop-types"; 
import { Card } from "react-bootstrap";
import { Row} from "react-bootstrap";
import { Col } from "react-bootstrap";

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

  export default MovieCard;