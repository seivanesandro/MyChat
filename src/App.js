import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/chatfeed/ChatFeed';
import LoginForm from './components/login/Login';

//import PropTypes from 'prop-types'

const projectID = process.env.REACT_APP_PROJECT;

const App = () => {
    if (!localStorage.getItem('username'))
        return <LoginForm />;
    return (
        <div className="app">
            <ChatEngine
                height="100vh"
                projectID={projectID}
                userName={localStorage.getItem(
                    'username'
                )}
                userSecret={localStorage.getItem(
                    'password'
                )}
                renderChatFeed={chatAppProps => (
                    <ChatFeed {...chatAppProps} />
                )}
                onNewMessage={() =>
                    new Audio(
                        'https://chat-engine-assets.s3.amazonaws.com/click.mp3'
                    ).play()
                }
            />
        </div>
    );
};

export default App;
