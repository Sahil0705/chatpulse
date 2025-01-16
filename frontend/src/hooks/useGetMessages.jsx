import { useEffect, useState } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../App';

const useGetMessages = () => {
    const { selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [messagesFetched, setMessagesFetched] = useState(false); // Track if messages are fetched

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data));
                setMessagesFetched(true); // Mark as fetched
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedUser?._id) {
            setMessagesFetched(false); // Reset on user change
            fetchMessages();
        }
    }, [selectedUser?._id]);

    return messagesFetched; // Return the fetch status
};

export default useGetMessages