import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { BiSolidSend } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import {
    sendMessage,
    isTyping
} from 'react-chat-engine';

const MessageForm = props => {
    const [value, setValue] = useState('');
    const { chatId, creds } = props;

    const handleChange = event => {
        setValue(event.target.value);
        isTyping(props, chatId);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const text = value.trim();

        if (text.length > 0) {
            sendMessage(creds, chatId, { text });
        }
        setValue('');
    };

    const handleUpload = event => {
        sendMessage(creds, chatId, {
            files: event.target.files,
            text: ''
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="message-form"
        >
            <input
                type="text"
                className="message-input"
                placeholder="send a message..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <AiOutlinePicture
                        className="picture-icon"
                        size={23}
                        style={{
                            color: '#3B2A50'
                        }}
                    />
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleUpload.bind(this)}
            />
            <button className="send-button">
                <BiSolidSend
                    className="send-icon"
                    size={23}
                    style={{
                        color: '#3B2A50'
                    }}
                />
            </button>
        </form>
    );
};

MessageForm.propTypes = {};

export default MessageForm;
