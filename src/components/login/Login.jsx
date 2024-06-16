import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import axios from 'axios';

const projectID = process.env.REACT_APP_PROJECT;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const authObject = {
            'Project-ID': projectID,
            'User-Name': username,
            'User-Secret': password
        };

        try {
            await axios.get(
                'https://api.chatengine.io/chats',
                { headers: authObject }
            );

            localStorage.setItem(
                'username',
                username
            );
            localStorage.setItem(
                'password',
                password
            );

            window.location.reload();
            setError('');
        } catch (err) {
            setError(
                'Oops, wrong credentials!'
            );
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">
                    My Chat Aplication
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={e =>
                            setUsername(
                                e.target.value
                            )
                        }
                        className="input"
                        placeholder="Your Username..."
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="input"
                        placeholder="Your Password..."
                        required
                    />
                    <div align="center">
                        <button
                            type="submit"
                            className="button"
                        >
                            <span>
                                start Chat
                            </span>
                        </button>
                    </div>
                </form>
                <h1 className='error'>{error}</h1>
            </div>
        </div>
    );
};

LoginForm.propTypes = {};

export default LoginForm;
