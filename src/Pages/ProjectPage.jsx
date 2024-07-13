import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getAllProjectsForUser } from '../Helpers/UserHelpers';
import { UserAuth } from '../Context/AuthContext';
import { InfinitySpin } from "react-loader-spinner";


function ProjectPage() {
    const { user } = UserAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProject = async () => {
        try {
            setLoading(true)
            const projectArray = await getAllProjectsForUser(user.uid)
            setProjects(projectArray)
            console.log(projectArray);
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchProject();
    }, [user])
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-semibold text-[#7365b7] '>My Projects</h2>
                <Link to="/add-projects" className='border p-1 px-4 rounded-md border-[#7365b7] flex items-center gap-3 text-[#7365b7]'><FaPlus />Create New</Link>
            </div>
            {loading ? (
                <div className='flex justify-center items-center h-[90vh]'>
                    <InfinitySpin width='250' color='#7365b7' />
                </div>
            ) : (
                projects.length!==0?(

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center pt-5">
                    {projects.map((project, index) => (
                        <div key={index} className='w-full'>
                            <Link to={`/project-details/${project.id}`}>
                                <ProjectCard project={project} />
                            </Link>
                        </div>
                    ))}
                </div>
                ):(
                    <p>No data found</p>
                )
            )}
        </div>
    )
}

export default ProjectPage