import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [bday, setBday] = useState(" ");
    const handleSubmit = (s) => {}

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">sign up</button>
            <br></br>
            <label>
                Username:
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
            <br></br>
            <label>
                birthday:
                <input
                type="date"
                value={bday}
                onChange={(e) => setBday(e.target.value)}
                />
            </label>    
        </form>
    )
};