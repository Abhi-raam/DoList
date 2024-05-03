import React from 'react'
import homeHero from '../assets/homeHero.png'
function HomeHero() {
  return (
    <div className='p-3 bg-[#e5dbfe] rounded-md  flex justify-between relative items-center px-10'>
        <div>
            <h2 className='text-xl md:text-3xl lg:text-4xl font-semibold'>Hi, Name</h2>
            <h2 className='text-xs md:text-sm lg:text-lg font-semibold text-[#7365b7]'>Welcome Home!, Ready to start your day</h2>
        </div>
        <div className=''>
            <img className='w-[12rem] lg:w-[19rem] overflow-auto' src={homeHero} alt="" />
        </div>
    </div>
  )
}

export default HomeHero