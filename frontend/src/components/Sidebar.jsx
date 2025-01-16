import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../App';
import Logout from './Logout';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {authUser, otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const [tempUsers, setTempUsers] = useState(null);

    useEffect(()=>{
        if(!tempUsers && otherUsers?.length>0){
            setTempUsers(otherUsers);
        }
    },[otherUsers]);

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const onSearchUser = (e) => {
        setSearch(e.target.value);
        searchSubmitHandler(null, e.target.value);
    }
    const searchSubmitHandler = (e, searchParam) => {
        e?.preventDefault();
        const searchQuery = searchParam || search;
        if(searchQuery?.length > 2){
            const conversationUsers = tempUsers?.filter((user)=> user.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
            if(conversationUsers?.length>0){
                dispatch(setOtherUsers(conversationUsers));
            }else{
                // toast.error("User not found!");
                dispatch(setOtherUsers([]));
            }
        }else{
            dispatch(setOtherUsers(tempUsers));
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>onSearchUser(e)}
                    className='input input-bordered rounded-md text-white' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 
            <OtherUsers/> 
            <div className='mt-2'>
                {/* <button onClick={logoutHandler} className='btn btn-sm'>Logout</button> */}
                { authUser && <Logout authUser={authUser} onLogout={logoutHandler} />}
            </div>
        </div>
    )
}

export default Sidebar