import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [navbtn, setNavBtn] = useState(false)
    const toggleNavBtn = () => {
        setNavBtn(!navbtn)
    }
    return (
        <div className='shadow-md'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="">
                        <div className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleNavBtn} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        {/* mobile view */}
                        {navbtn ?
                        <div className='relative'>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute  ">
                                <li><Link to='/'>Home</Link></li>
                                <li>
                                    <a href="">Projects</a>
                                    <ul className="p-2">
                                        <li><Link to='/projects'>All Projects</Link></li>
                                        <li><Link to='/add-projects'>Add Projects</Link></li>
                                    </ul>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </div>
                            : null}
                    </div>
                    <a className="btn btn-ghost text-xl text-[#7365b7]">DoList</a>
                </div>
                {/* lg screen */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li className='z-30'>
                            <details>
                                <summary>Project</summary>
                                <ul className="w-[10rem]">
                                    <li><Link to='/projects'>All Projects</Link></li>
                                    <li><Link to='/add-projects'>Add Projects</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar