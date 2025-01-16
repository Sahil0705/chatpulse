import { useContext, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { SocketContext } from "../context/Socket";

const useGetRealTimeMessage = (messagesFetched) => {
    const { socket } = useContext(SocketContext)
    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();
    useEffect(() => {
        if (messagesFetched && socket) {
            const handleNewMessage = (newMessage) => {
                dispatch(setMessages([...messages, newMessage]));
            };
            socket.on("newMessage", handleNewMessage);
            return () => socket?.off("newMessage", handleNewMessage); // Cleanup on unmount
        }
    }, [messagesFetched, socket]);
};
export default useGetRealTimeMessage;