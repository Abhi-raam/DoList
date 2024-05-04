import React from 'react'
import HomeHero from '../Components/HomeHero'
import ProjectCard from '../Components/ProjectCard'

function HomePage() {
    return (
        <div className='m-4'>
            <div>
                <HomeHero />
            </div>
            <div className='pt-5'>
                <h3 className='font-semibold text-sm text-[#7365b7]'>Overview</h3>
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
        </div>
    )
}

export default HomePage