import { useState } from "react";
import { Button } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (s) => {
        s.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email
          };
      
          fetch("https://movieteka-zabokaa.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if (response.ok) {
              alert("signup successful");
              window.location.reload();
            } else {
              alert("signup failed");
            }
          });
        };
    

    return (
        <form onSubmit={handleSubmit}>
            <Button className="button-find" type="submit">sign up</Button>
            <br></br>
            <label>
                username:
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                />
            </label>
            <br></br>
            <label>
                password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <br></br>
            <label>
                email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
        </form>
    );
};