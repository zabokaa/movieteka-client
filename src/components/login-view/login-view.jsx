import { useState } from "react";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (s) => {
    s.preventDefault();
    const data = {
      username: username,
      password: password
    };
    fetch("https://movieteka-zabokaa.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) { //keep in local storage:
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem("token", data.token)
          onLoggedIn(data.user, data.token); //send token 
        } else {
          alert("no such user");
        }
      })
      .catch((e) => {
        alert("something went wrong!");
      });
  };

  return (
    <>
      <Container style={{ border: "2px solid orange", borderRadius: "20px", marginTop: 80, marginBottom: 80}} fluid="md">
 
        <Row>
          <Col>
            <Card style={{ marginTop: 80, marginBottom: 80 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>welcome back</Card.Title>
                <Form onSubmit={handleSubmit} >
                  <Form.Group className="mb-3" controlId="formGroupUsername">

                    <Form.Label>username:</Form.Label>

                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="your username"
                    />

                    <Form.Text></Form.Text>

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGrouopUsername">

                    <Form.Label>password:</Form.Label>

                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="your password"
                    />

                    <Form.Text></Form.Text>

                  </Form.Group>
                  <Button className="button" type="submit"> go !</Button>
                </Form>
              </Card.Body>
            </Card>

          </Col>
        </Row>

      </Container>

      {/* <Container style={{ border: "2px solid plum", borderRadius: "20px", marginTop: 80, marginBottom: 80 }}>
        <SignupView />
      </Container> */}
    </>
  );
};