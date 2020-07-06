import * as React from 'react';
import Layout from '~views/layout/Layout';
import MessageBubble from '~views/home/MessageBubble';
import ChatContainer from '~views/home/styles/ChatContainer';
import MessageSendingSection from '~views/home/MessageSendingSection';
import useConnection from '~services/ConnectionContext';
import {useEffect} from 'react';

export default () => {

    const { messages, setLastSeenAt } = useConnection();

    const chatBubbles = messages.map((message, i = 0) => (
        <MessageBubble
            key={i}
            message={message}
        />
    ));

    useEffect(() => {
        setLastSeenAt(Date.now());

        const container = document.getElementById('messagesContainer');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <Layout>
            <ChatContainer id="messagesContainer">
                {chatBubbles}
            </ChatContainer>

            <MessageSendingSection />
        </Layout>
    );
}
