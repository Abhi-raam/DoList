import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/login.png'
import { createUser } from '../Helpers/UserHelpers'
import { useState } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { InfinitySpin } from 'react-loader-spinner'

function SignupPage() {
    const navigate = useNavigate()
    const { register,setGotoSignip } = UserAuth()
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await register(email, password);
            await createUser(email, password, username);
            setEmail('');
            setPassword('');
            setUserName('');
            navigate('/login');
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }finally{
            setLoading(false)
        }
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    if (loading) {
        return (
            <div className='items-center h-[90vh] justify-center flex'>
                <InfinitySpin width='200' color='#7365b7' />
            </div>
        )
    }
    return (
        <div className='h-screen flex items-center justify-around'>
            <div className='w-[80%] lg:w-1/3  space-y-5'>
                <div>
                    <h2 className='text-center text-2xl font-semibold'>Welcome </h2>
                    <h4 className='text-sm text-center text-gray-500 font-semibold'>Please signup to continue</h4>
                </div>
                <form action="" onSubmit={handleSubmit}  >
                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">Username </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered"
                            onChange={(e) => { setUserName(e.target.value) }} />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="Email"
                            placeholder="Password"
                            className="input input-bordered"
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label className="form-control relative pb-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            className="input input-bordered"
                            onChange={(e) => { setPassword(e.target.value) }} />
                        <div
                            className='absolute right-3 bottom-6 cursor-pointer'
                            onClick={togglePasswordVisibility}>
                            {passwordVisible ? <PiEye /> : <PiEyeClosed />}
                        </div>
                    </label>
                    <button type='submit' className='btn w-full bg-violet-600 hover:bg-violet-700 text-white hover:bg-blue_secondary'>
                        Signup
                    </button>
                </form>

                <div className='text-center'>
                    <h3>Already a member ? <Link to='/login' className='text-blue_secondary font-medium underline cursor-pointer' onClick={()=>setGotoSignip(false)}>Login</Link></h3>
                </div>

            </div>
            <div className='w-auto hidden lg:block'>
                <img src={loginImg} alt="" />
            </div>
        </div>
    )
}

export default SignupPage