import React, { useEffect, useState } from 'react'
import HomeHero from '../Components/HomeHero'
import ProjectCard from '../Components/ProjectCard'
import { InfinitySpin } from "react-loader-spinner";
import { UserAuth } from '../Context/AuthContext';
import { getAllProjectsForUser } from '../Helpers/UserHelpers';
function HomePage() {
    const { user } = UserAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const fetchProject = async () => {
            try {
                setLoading(true)
                const projectArray = await getAllProjectsForUser(user.uid)
                setProjects(projectArray)
            } finally {
                setLoading(false)
            }
        }

        fetchProject();
    }, [user])
    return (
        <div className='m-4'>
            <div>
                <HomeHero />
            </div>
            {loading ? (
                <div className='flex justify-center items-center h-[60vh]'>
                    <InfinitySpin width='250' color='#7365b7' />
                </div>
            ) : (
                <div className='pt-5'>
                    <h3 className='font-semibold text-sm text-[#7365b7]'>Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center pt-5">
                        {projects.map((project, index) => (
                            <ProjectCard project={project} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage