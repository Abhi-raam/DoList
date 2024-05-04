import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const AddProjects = () => {
    const [projectName, setProjectName] = useState('');
    const [projectId, setProjectId] = useState(uuidv4());
    const [projectCreatedOn, setProjectCreatedOn] = useState(Date.now());
    const [todos, setTodos] = useState([
        {
            id: uuidv4(),
            name: '',
            description: '',
            createdOn: Date.now(),
            updatedOn: Date.now()
        }
    ]);

    const addTask = () => {
        setTodos([
            ...todos,
            {
                id: uuidv4(), // Generate unique ID for the new task
                name: '',
                description: '',
                createdOn: Date.now(),
                updatedOn: Date.now()
            }
        ]);
    };

    const removeTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index)); // Correctly remove the specified task
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
        console.log("Project id:", projectId);
        console.log("Project:", projectName);
        console.log("Created date : ", projectCreatedOn);
        console.log("Todos:", todos);
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
