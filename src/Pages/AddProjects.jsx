import React, { useState } from 'react';
import { createProject } from '../Helpers/UserHelpers';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProjects = () => {
    const { user } = UserAuth();
    const navigate = useNavigate()
    const [projectName, setProjectName] = useState('');
    const [projectCreatedOn, setProjectCreatedOn] = useState(Date.now());
    const [todos, setTodos] = useState([
        {
            name: '',
            description: '',
            status: false,
            createdOn: Date.now(),
            updatedOn: Date.now()
        }
    ]);

    const addTask = () => {
        setTodos([
            ...todos,
            {

                name: '',
                description: '',
                status: false,
                createdOn: Date.now(),
                updatedOn: Date.now()
            }
        ]);
    };

    const removeTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleTodoChange = (index, field, value) => {
        const updatedTodos = [...todos];
        updatedTodos[index][field] = value;
        updatedTodos[index].createdOn = Date.now();
        updatedTodos[index].updatedOn = Date.now();
        setTodos(updatedTodos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullProject = {
            projectName,
            projectCreatedOn,
            userId: user.uid,
            todos

        }
        createProject(fullProject)
        navigate('/projects')
    };

    return (
        <div className='p-6 lg:h-screen'>
            <div>
                <h2 className='text-2xl lg:text-3xl font-semibold'>Create New Project</h2>
            </div>
            <div className='flex justify-center bg-white mt-10 pb-5 rounded-md'>
                <form onSubmit={handleSubmit} className='w-full space-y-5 p-3'>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Project Name</span>
                        </div>
                        <input
                            required
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)} />
                    </label>
                    {todos.map((todo, index) => (
                        <div key={index} className="pb-3">
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Task Name</span>
                                </div>
                                <div className='flex gap-3'>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full"
                                        value={todo.name}
                                        onChange={(e) => handleTodoChange(index, 'name', e.target.value)} />
                                </div>
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <div className='flex gap-3'>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full"
                                        value={todo.description}
                                        onChange={(e) => handleTodoChange(index, 'description', e.target.value)} />
                                    <button
                                        type="button"
                                        className="btn bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => removeTask(index)}>
                                        Remove Task
                                    </button>
                                </div>
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn bg-green-500 hover:bg-green-600 text-white"
                        onClick={addTask}>
                        Add Task
                    </button>
                    <div className='flex justify-center pt-10'>
                        <button type="submit" className='btn btn-sm px-6 btn-primary'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjects;
