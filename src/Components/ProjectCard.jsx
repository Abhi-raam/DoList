import React, { useState } from 'react'
import { FaFolderOpen } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

function ProjectCard() {
    const [toggle, setToggle] = useState(false)
    const toggleDlt = () => {
        setToggle(!toggle)
    }
    return (
        <div className='shadow-md bg-slate-200 w-full lg:w-[90%] p-5 hover:-translate-y-1 transition rounded-md cursor-pointer'>
            <div className='flex items-center justify-between '>
                <FaFolderOpen className='text-5xl' />
                <HiDotsVertical onClick={toggleDlt} />
            </div>
            {toggle?
            <div className=' relative'>
                <div className='text-red-600 font-medium flex items-center gap-3 bg-white p-2 rounded-md absolute right-0 -top-2'>
                    <RiDeleteBin6Line />Delete
                </div>
            </div>
            :null}
            <div className='flex justify-between items-center pt-5'>
                <h2 className='text-lg font-semibold'>Project 1</h2>
                <div className='flex flex-col items-center'>
                    <h2 className='font-semibold text-[13px]'>1/3 completed</h2>
                    <h2 className='font-semibold text-[12px]'>24 Apr 2024</h2>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard