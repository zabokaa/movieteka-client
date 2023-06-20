import { useState } from "react";

export const LoginView = () => {
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");
    const handleSubmit = (s) => {
        s.preventDefault();
        const data = {
            access: username,
            secret: password
        };
        fetch("https://movieteka-zabokaa.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data)
        })  .then((response) => {
            if (response.ok) {
                onLoggedIn(username);
            } else {
                alert("login failed");
            }
        })
    };

    return (
      <form onSubmit={handleSubmit}> 
        <label>
          username:
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        <label>
          password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </label>
        <button type="submit">go !</button>
      </form>
    );
  };