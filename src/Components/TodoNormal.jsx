import React from 'react'

function TodoNormal({ project }) {
    return (
        <div className='p-3'>
            {project?.todos.map((item, index) => {
                const timeDifferenceInMinutes = Math.floor(
                    (new Date(item.updatedOn) - new Date(item.createdOn)) / (1000 * 60)
                  );
                  let displayValue;
                  if (timeDifferenceInMinutes < 60) {
                    displayValue = `${timeDifferenceInMinutes} minute`;
                  } else if (timeDifferenceInMinutes < 1440) {
                    const hours = Math.floor(timeDifferenceInMinutes / 60);
                    displayValue = `${hours} hour`;
                  } else {
                    const days = Math.floor(timeDifferenceInMinutes / 1440);
                    displayValue = `${days} day`;
                  }

                return (
                    <div className='flex items-center gap-5 bg-slate-300 rounded-md p-4 mb-2 hover:-translate-y-1 transition'>
                        <div>
                            <input type="checkbox" className="checkbox" />
                        </div>
                        <div className='w-full space-y-3'>
                            <h2 className='font-medium text-xl'>{item.name}</h2>
                            <h2 className='text-lg font-medium'>{item.description}</h2>
                            <div className='flex justify-between '>
                                <h2 className='font-medium'> {new Date(item.createdOn).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                                </h2>
                                <h2 className='font-medium'>{displayValue}</h2>
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default TodoNormal