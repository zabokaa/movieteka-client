import { useState } from "react";
import { SignupView } from "../signup-view/signup-view";

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
        })  .then((response) => response.json())
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
        <br></br>
      </form>
      <SignupView />
      </>
    );
  };