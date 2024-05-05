import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

function TodoTable({ project,updateTodoStatus }) {
    const handleCheckboxChange = (index) => {
        const newStatus = !project.todos[index].status; // Toggle the status
        updateTodoStatus(index, newStatus); // Pass index and new status to the parent function
      };
    return (
        <div>
            <div className='m-5 p-2 rounded-md bg-slate-100 shadow-md'>
                <table className='table'>
                    <thead className='font-semibold text-black text-center border border-slate-600'>
                        <tr className='border border-slate-600'>
                            <th className='border border-slate-600'>Check</th>
                            <th className='border border-slate-600'>Todo Name</th>
                            <th className='border border-slate-600'>Description</th>
                            <th className='border border-slate-600'>Status</th>
                            <th className='border border-slate-600'>Created</th>
                            <th className='border border-slate-600'>Updated</th>
                            <th className='border border-slate-600'>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='border border-slate-600'>
                        {project?.todos.map((item, index) => {
                            const timeDifferenceInMinutes =Math.floor((Date.now() - new Date(item.updatedOn)) / (1000 * 60)) 
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
                                    <td className='border border-slate-600'>
                                        <input type='checkbox' className="checkbox" checked={item.status} 
                                            onChange={() => handleCheckboxChange(index)}/>
                                    </td>
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
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })}
                                    </td>
                                    <td className={`border border-slate-600 ${item.status ? "line-through" : ""}`}>
                                        {displayValue}
                                    </td>
                                    <td className='border border-slate-600 '>
                                        <div className='text-red-600 flex items-center justify-center gap-2'>
                                            <RiDeleteBin6Line />
                                            <p>Delete</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoTable;
