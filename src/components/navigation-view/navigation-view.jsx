import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationView = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="navi" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          --MOVIE--TEKA--
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  home
                </Nav.Link>

                {/* not working up to now */}
                <Nav.Link as={Link} to="/profile">
                  my profile
                </Nav.Link>
                
                <Nav.Link onClick={onLoggedOut}>logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};