import React from 'react'
import ProjectCard from '../Components/ProjectCard'
import { FaPlus } from "react-icons/fa6";

function ProjectPage() {
    const api =import.meta.env.VITE_FIREBASE_API_KEY
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-semibold text-[#7365b7] '>My Projects</h2>
                <button className='border p-1 px-4 rounded-md border-[#7365b7] flex items-center gap-3 text-[#7365b7]'><FaPlus/>Create New</button>
            </div>
            {api}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center pt-5">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    )
}

export default ProjectPage