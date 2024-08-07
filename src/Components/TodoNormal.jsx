import React from 'react'

function TodoNormal({ project, updateTodoStatus, setProject }) {
    const handleCheckboxChange = (index) => {
        const newStatus = !project.todos[index].status;
        updateTodoStatus(index, newStatus);
    };
    return (
        <div className='p-3'>
            {project?.todos?.map((item, index) => {
                const timeDifferenceInMinutes = Math.floor((Date.now() - new Date(item.updatedOn)) / (1000 * 60))
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
                    <div key={index} className='flex items-center gap-5 bg-slate-300 rounded-md p-4 mb-2 hover:-translate-y-1 transition'>
                        <div>
                            <input type='checkbox' className="checkbox" checked={item.status} onChange={() => handleCheckboxChange(index)} />
                        </div>
                        <div className='w-full space-y-3'>
                            <h2 className={`font-medium text-xl ${item.status ? "line-through" : ""}`}>{item.name}</h2>
                            <h2 className={`text-lg font-medium ${item.status ? "line-through" : ""}`}>{item.description}</h2>
                            <div className='flex justify-between '>
                                <h2 className={`font-medium ${item.status ? "line-through" : ""}`}> {new Date(item.createdOn).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                                </h2>
                                <h2 className={`font-medium ${item.status ? "line-through" : ""}`}>{displayValue}</h2>
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default TodoNormal