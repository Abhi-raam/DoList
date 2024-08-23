import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { editProject, getProjectById } from '../Helpers/UserHelpers';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
function EditProject() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [projectName, setProjectName] = useState('');
    const [todos, setTodos] = useState([]);
    const projectId = location.pathname.split('/').pop();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectData = await getProjectById(projectId);
                setProjectName(projectData.projectName);
                setTodos(projectData.todos || []);
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const addTask = () => {
        setTodos([
            ...todos,
            {
                name: '',
                description: '',
                status: false,
                createdOn: Date.now(),
                updatedOn: Date.now(),
            },
        ]);
    };

    const removeTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleTodoChange = (index, field, value) => {
        const updatedTodos = [...todos];
        updatedTodos[index][field] = value;
        updatedTodos[index].updatedOn = Date.now();
        setTodos(updatedTodos);
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const fullProject = {
            projectName,
            userId: user.uid,
            todos,
        };

        try {
            await editProject(projectId, fullProject);
            navigate('/projects');
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    if (loading) {
        return (
            <div className='items-center h-[90vh] justify-center flex'>
                <InfinitySpin width='200' color='#7365b7' />
            </div>
        )
    }

    return (
        <div className='p-6 min-h-screen'>
            <div>
                <h2 className='text-2xl lg:text-3xl font-semibold'>Edit Project</h2>
            </div>
            <div className='flex justify-center bg-white mt-10 pb-5 rounded-md'>
                <form onSubmit={handleEdit} className='w-full space-y-5 p-3'>
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
                                        onChange={((e) => handleTodoChange(index, 'description', e.target.value))} />
                                    <button
                                        type="button"
                                        className="btn btn-circle bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => removeTask(index)}>
                                       <IoCloseCircleOutline size={25}/>
                                    </button>
                                </div>
                            </label>
                        </div>
                    ))}
                    <button
                        type='button'
                        className='btn btn-circle bg-green-500 hover:bg-green-600 text-white'
                        onClick={addTask}>
                         <IoAddCircleOutline size={25}/>
                    </button>
                    <div className='flex justify-center pt-10'>
                        <button type='submit' className='btn btn-sm px-6 text-white bg-violet-500 hover:bg-violet-600'>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProject;
