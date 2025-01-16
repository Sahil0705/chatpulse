import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return; // early return in react
     
    return (
        <div className='overflow-auto flex-1'>
            {otherUsers?.length > 0 ? (
                otherUsers.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            ) : (
                <div className="text-center font-bold text-white mt-4">
                    No users found 😔
                </div>
            )}
        </div>
    );
    
}

export default OtherUsers