import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteTodo } from '../Helpers/UserHelpers';
import { InfinitySpin } from 'react-loader-spinner';

function TodoTable({ projectId, project, updateTodoStatus, setProject }) {
    const [loading, setLoading] = useState(false);
    const handleCheckboxChange = (index) => {
        const newStatus = !project.todos[index].status;
        updateTodoStatus(index, newStatus);
    };

    const handleDeleteTodo = async (index) => {
        try {
            setLoading(true);
            await deleteTodo(projectId, index, project.todos);
            const updatedProject = {
                ...project,
                todos: project.todos.filter((_, idx) => idx !== index),
            };
            setProject(updatedProject);
        } catch (error) {
            alert(error)
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className='items-center h-[90vh] justify-center flex'>
                <InfinitySpin width='200' color='#7365b7' />
            </div>
        );
    }
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
                                    <td className='border border-slate-600'>
                                        <input type='checkbox' className="checkbox" checked={item.status}
                                            onChange={() => handleCheckboxChange(index)} />
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
                                        })}
                                    </td>
                                    <td className={`border border-slate-600 ${item.status ? "line-through" : ""}`}>
                                        {displayValue}
                                    </td>
                                    <td className='border border-slate-600 '>
                                        <div onClick={() => { index >= 0 && index < project.todos.length ? handleDeleteTodo(index) : console.log("index now equal to one"); }} className='text-red-600 flex items-center justify-center gap-2'>
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
