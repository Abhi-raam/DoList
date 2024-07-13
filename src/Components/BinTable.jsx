import React from 'react'

function BinTable({ project }) {
    return (
        <div>
            <div className='m-5 p-2 rounded-md bg-slate-100 shadow-md'>
                <table className='table'>
                    <thead className='font-semibold text-black text-center border border-slate-600'>
                        <tr className='border border-slate-600'>
                            {/* <th className='border border-slate-600'>Check</th> */}
                            <th className='border border-slate-600'>Todo Name</th>
                            <th className='border border-slate-600'>Description</th>
                            <th className='border border-slate-600'>Status</th>
                            <th className='border border-slate-600'>Created</th>
                            <th className='border border-slate-600'>Updated</th>
                        </tr>
                    </thead>
                    <tbody className='border border-slate-600'>
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
                                <tr key={index} className='hover cursor-pointer text-center font-medium'>
                                    <td className={`border border-slate-600 ${item.status ? "line-through" : ""}`}>{item.name}</td>
                                    <td className={`border border-slate-600 max-w-[25rem] text-center ${item.status ? "line-through" : ""}`}>{item.description}</td>
                                    <td className={`border border-slate-600 max-w-[25rem] text-center ${item.status ? "line-through" : ""}`}    >
                                        {item.status ? <p>Completed</p> : <p>Pending</p>}
                                    </td>
                                    <td className={`border border-slate-600 ${item.status ? "line-through" : ""}`}>
                                        {new Date(item.createdOn).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className={`border border-slate-600 ${item.status ? "line-through" : ""}`}>
                                        {displayValue}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BinTable