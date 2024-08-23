import React from 'react'

function OverviewCard({name,number,bg_colour,icon}) {
    return ( 
        <div className={`flex items-center justify-around w-[90%] h-[5rem] rounded-md ${bg_colour}`}>
            <div className='bg-slate-700/40 p-3 rounded-md'>
                {icon}
            </div>
            <div className='text-lg font-medium text-center text-slate-100'>
                <h3>{number}</h3>
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default OverviewCard