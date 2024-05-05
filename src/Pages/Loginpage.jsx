import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/login.png'
import { useState } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { PiEye, PiEyeClosed } from "react-icons/pi";

function Loginpage() {
    const navigate = useNavigate()
    const [email, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signIn } = UserAuth();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            console.log('Login success');
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='h-screen flex items-center justify-around'>
            <div className='w-[80%] lg:w-1/3  space-y-5'>
                <div>
                    <h2 className='text-center text-2xl font-semibold'>Welcome Back!</h2>
                    <h4 className='text-sm text-center text-gray-500 font-semibold'>Please login to continue</h4>
                </div>
                <form action="" onSubmit={handleSubmit} >
                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="email" placeholder="Email" className="input input-bordered" onChange={(e) => { setUserEmail(event.target.value) }} />
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
                        Login
                    </button>
                </form>
                <div className='text-center'>
                    <h3>Not a member ? <Link to='/signup' className='text-blue_secondary font-medium underline cursor-pointer'>Register Now</Link></h3>
                </div>
            </div>
            <div className='w-auto hidden lg:block'>
                <img src={loginImg} alt="" />
            </div>
        </div>
    )
}

export default Loginpage