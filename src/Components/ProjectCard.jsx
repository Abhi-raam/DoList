import React, { useState } from 'react'
import { FaFolderOpen } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

function ProjectCard({ project }) {
    const [toggle, setToggle] = useState(false)
    const toggleDlt = () => {
        setToggle(!toggle)
    }
    const lengthTodo = project.todos.length
    const date = new Date(project.projectCreatedOn)
    const formattedDate = date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    const incompleteTodos = project.todos.filter((todo) => todo.status === true);
    return (
        <div className='shadow-md bg-slate-200 w-full lg:w-[90%] p-5 hover:-translate-y-1 transition rounded-md cursor-pointer'>
            <div className='flex items-center justify-between  '>
                <FaFolderOpen className='text-5xl' />
                <HiDotsVertical onClick={toggleDlt} />
            </div>  
            {toggle ?
                <div className=' relative'>
                    <div className='text-red-600 font-medium  bg-white p-2 rounded-md absolute right-0 -top-2'>
                        <div className='hover:bg-slate-300 flex items-center gap-3 p-1 rounded-sm'>
                            <RiDeleteBin6Line />Delete
                        </div>
                    </div>
                </div>
                : null}
            <div className='flex justify-between items-center pt-5'>
                <h2 className='text-lg font-semibold'>{project.projectName}</h2>
                <div className='flex flex-col items-center'>
                    <h2 className='font-semibold text-[13px]'>{incompleteTodos.length}/{lengthTodo} completed </h2>
                    <h2 className='font-semibold text-[12px]'>{formattedDate}</h2>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard