import React from "react";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

const Logout = ({ authUser, onLogout }) => {

    
    const { fullName: username, profilePhoto: profileImage} = authUser;

    return (
        <div className="flex items-center space-x-3 p-2 rounded-full bg-gray-100 shadow-md w-fit">
          {/* Profile Image */}
          <img
            src={profileImage}
            alt={`${username}'s profile`}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          {/* Username */}
          <p className="text-md font-semibold text-gray-800">{username}</p>
          {/* Logout Icon */}
          <button
            onClick={onLogout}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <FiLogOut className="text-lg" />
          </button>
        </div>
      );
};

export default Logout;
