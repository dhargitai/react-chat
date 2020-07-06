import React, {ComponentPropsWithoutRef, createContext, useContext, useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import {i18n} from '~i18n/index';

interface Message {
    username: string;
    time: number;
    message: string;
    connectionId: string;
    isOwn?: boolean;
}

interface ConnectionContextFields {
    socket: SocketIOClient.Socket;
    messages: Array<Message>;
    connectionId: string;
    setLastSeenAt: (timestamp: number) => void;
    numberOfNewMessages: number;
}

const ENDPOINT = process.env.NODE_ENV === 'test' ? '' : (process.env.SOCKET_ENDPOINT || 'http://localhost:5000');

const ConnectionContext = createContext({});
const ORIGINAL_DOCUMENT_TITLE = 'React Chat';

export const ConnectionProvider = (props: ComponentPropsWithoutRef<any>) => {
    const children = props.children;

    const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
    const [connectionId, setConnectionId] = useState<string | undefined>(undefined);
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [numberOfNewMessages, setNumberOfNewMessages] = useState<number>(0);
    const [lastSeenAt, setLastSeenAt] = useState<number>(Date.now());
    const [blinkIntervalId, setBlinkIntervalId] = useState<any>(0);

    const doBlink = () => {
        const intervalId = setInterval(() => {
            if (document.title === ORIGINAL_DOCUMENT_TITLE) {
                document.title = i18n('common.newMessage');
            } else {
                document.title = ORIGINAL_DOCUMENT_TITLE;
            }
        }, 700);
        return intervalId;
    };

    const removeBlink = () => {
        if (blinkIntervalId) {
            clearInterval(blinkIntervalId);
            setBlinkIntervalId(0);
            document.title = ORIGINAL_DOCUMENT_TITLE;
        }
    };

    useEffect(() => {
        if (!socket) {
            const socketInstance = socketIOClient(ENDPOINT);
            setSocket(socketInstance);
        } else if (!connectionId) {
            socket.on('connection_created', (connectionData: any) => {
                setConnectionId(connectionData.connectionId);
            });
        } else {
            if (messages.length
                && lastSeenAt >= messages[messages.length - 1].time
                && blinkIntervalId
                && numberOfNewMessages
            ) {
                removeBlink();
                setNumberOfNewMessages(0);
            }
        }
    });

    useEffect(() => {
        if (socket && connectionId) {
            socket.off('new_message');
            socket.on('new_message', (newMessage: Message) => {
                setMessages([
                    ...messages,
                    {
                        ...newMessage,
                        isOwn: newMessage.connectionId === connectionId,
                    },
                ]);

                if (lastSeenAt < newMessage.time) {
                    setNumberOfNewMessages(numberOfNewMessages + 1);

                    if (!blinkIntervalId) {
                        setBlinkIntervalId(doBlink());
                    }
                }
            });
        }
    }, [connectionId, messages, numberOfNewMessages, blinkIntervalId]);

    return <ConnectionContext.Provider value={{
        socket,
        messages,
        connectionId,
        setLastSeenAt,
        numberOfNewMessages,
    }}>
        {children}
    </ConnectionContext.Provider>
};

export default function useConnection(): ConnectionContextFields {
    return useContext(ConnectionContext) as ConnectionContextFields;
};
