import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

import { registerUser, loginUser } from '../api';

const LoginRegister = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    return (
        <div id="forms">
            <h1>Login or Register</h1>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            onSubmit={async (event) => {
                event.preventDefault();

                try {
                    await loginUser(username, password);

                    history.push("/");
                } catch (error) {
                    console.error(error);
                }
            }}
            >
            <div className="form-group">
                <h3>Login</h3>
                <label htmlFor="loginInputUsername">Username</label>
                <input
                    type="text"
                    id="loginInputUsername"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="loginInputPassword">Password</label>
                <input
                    type="password"
                    id="loginInputPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
            </form>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            onSubmit={async (event) => {
                event.preventDefault();

                try {
                    await registerUser(username, password);

                    history.push("/");
                } catch (error) {
                    console.error(error);
                }
            }}
            >
            <div className="form-group">
                <h3>Register</h3>
                <label htmlFor="registerInputUsername">Username</label>
                <input
                    type="text"
                    id="registerInputUsername"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="registerInputPassword">Password</label>
                <input
                    type="password"
                    id="registerInputPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginRegister;