import React from 'react';
//import PropTypes from 'prop-types'
import MessageForm from '../message/MessageForm';
import MyMessage from '../message/MyMessage';
import TheirMessage from '../message/TheirMessage';

const ChatFeed = props => {
    //console.log(props)

    //retruturaçao do objecto
    const {
        chats,
        activeChat,
        userName,
        messages
    } = props;

    //se chats for verdadeiro returna o chat active
    const chat = chats && chats[activeChat];

    const renderReadeReceipts = (
        message,
        isMyMessage
    ) =>
        chat.people.map(
            (person, index) =>
                person.last_read ===
                    message.id && (
                    <div
                        key={`read_${index}`}
                        className="read-receipt"
                        style={{
                            float: isMyMessage
                                ? 'right'
                                : 'left',
                            backgroundImage:
                                person.person
                                    .avatar &&
                                `url(${person.person.avatar})`,
                        }}
                    />
                )
        );

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey =
                index === 0
                    ? null
                    : keys[index - 1];
            const isMyMessage =
                userName ===
                message.sender.userName;

            return (
                <div
                    key={`msg_${index}`}
                    style={{ width: '100%' }}
                >
                    <div className="message-block">
                        {isMyMessage ? (
                            <MyMessage
                                message={message}
                            />
                        ) : (
                            <TheirMessage
                                message={message}
                                lastMessage={
                                    messages[
                                        lastMessageKey
                                    ]
                                }
                            />
                        )}
                    </div>
                    <div
                        className="read-receipts"
                        style={{
                            marginRight:
                                isMyMessage
                                    ? '18px'
                                    : '0px',
                            marginLeft:
                                isMyMessage
                                    ? '0px'
                                    : '69px'
                        }}
                    >
                        {renderReadeReceipts(
                            message,
                            isMyMessage
                        )}
                    </div>
                </div>
            );
        });
    };

    if (!chat) return <div />;

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    {chat?.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map(
                        person =>
                            `${person.person.username}, `
                    )}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm
                    {...props}
                    chatId={activeChat}
                />
            </div>
        </div>
    );
};

export default ChatFeed;
