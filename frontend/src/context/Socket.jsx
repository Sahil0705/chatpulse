import { createContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setOnlineUsers } from '../redux/userSlice';
import { BASE_URL } from '../App';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const { authUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    // Use a ref to persist the socket instance
    const socketRef = useRef(null);

    useEffect(() => {
        if (authUser) {
            // Initialize socket connection
            socketRef.current = io(`${BASE_URL}`, {
                query: {
                    userId: authUser._id,
                },
            });

            // Log connection
            socketRef.current.on('connect', () => {
                console.log('Connected to server');
            });

            // Handle online users update
            socketRef.current.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            // Cleanup on unmount or authUser change
            return () => cleanUpConnection;
        }

        // Cleanup when authUser becomes null or undefined
        return () => cleanUpConnection;
    }, [authUser]);

    const cleanUpConnection = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
