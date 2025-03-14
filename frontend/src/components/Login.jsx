import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../App';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector(store => store.user);
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      toast.success("Login Sucess");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="min-w-96 mx-auto text-white">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='test1: Ramesh315, test2: Sarthak194' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='test1: abc123, test2: wer456' />
          </div>
          <p className='text-center my-2'>Don't have an account? <Link to="/signup" className='hover:underline'> Signup </Link></p>
          <div>
            <button type="submit" className='h-9 text-lg bg-slate-950 btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login