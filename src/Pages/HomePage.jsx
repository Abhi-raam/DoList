import React, { useEffect, useState } from 'react'
import HomeHero from '../Components/HomeHero'
import ProjectCard from '../Components/ProjectCard'
import { InfinitySpin } from "react-loader-spinner";
import { UserAuth } from '../Context/AuthContext';
import { getAllProjectsForUser } from '../Helpers/UserHelpers';
import { Link } from 'react-router-dom';
import OverviewCard from '../Components/OverviewCard';
import { GrProjects } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

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

    const totalIncompleteTodos = projects.reduce((count, project) => {
        return count + project.todos.filter(todo => !todo.status).length;
    }, 0);
    const totalCompleteTodos = projects.reduce((count, project) => {
        return count + project.todos.filter(todo => todo.status).length;
    }, 0);
    const totalTodos = projects.reduce((count, project) => {
        return count + project.todos.filter(todo=>todo).length;
    }, 0);

    return (
        <div className='m-4 min-h-screen'>
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
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center pt-4'>
                        <OverviewCard icon={<GrProjects size={28} className='text-white'/>} name={"Total Projects"} number={projects.length} bg_colour={"bg-violet-500"} />
                        <OverviewCard icon={<FaTasks size={28} className='text-white'/>} name={"Total Todos"} number={totalTodos} bg_colour={"bg-blue-500"} />
                        <OverviewCard icon={<TiTick size={28} className='text-white'/>} name={"Completed Todos"} number={totalCompleteTodos} bg_colour={"bg-green-500"} />
                        <OverviewCard icon={<MdOutlinePendingActions size={28} className='text-white'/>} name={"Pending Todos"} number={totalIncompleteTodos} bg_colour={"bg-yellow-500/80"} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-5 pt-5">
                        {projects.map((project, index) => (
                            <Link key={index} to={`/project-details/${project.id}`}>
                                <ProjectCard project={project} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage