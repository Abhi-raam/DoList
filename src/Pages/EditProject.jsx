import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { editProject, getProjectById } from '../Helpers/UserHelpers';
import { UserAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

function EditProject() {
    const { user } = UserAuth(); // Get user info
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true); // Loading state
    const [projectName, setProjectName] = useState('');
    const [todos, setTodos] = useState([]); // Initial empty array for todos
    const projectId = location.pathname.split('/').pop(); // Extract project ID from the URL

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectData = await getProjectById(projectId); // Fetch project details
                setProjectName(projectData.projectName); // Set project name
                setTodos(projectData.todos || []); // Set todos
            } catch (error) {
                console.error('Error fetching project details:', error); // Handle error
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProjectDetails(); // Fetch project details when component mounts
    }, [projectId]); // Dependency array with projectId

    const addTask = () => {
        setTodos([
            ...todos,
            {
                name: '',
                description: '',
                status: false,
                createdOn: Date.now(), // Initial createdOn for new tasks
                updatedOn: Date.now(),
            },
        ]);
    };

    const removeTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleTodoChange = (index, field, value) => {
        const updatedTodos = [...todos];
        updatedTodos[index][field] = value; // Update the field
        updatedTodos[index].updatedOn = Date.now(); // Update updatedOn
        setTodos(updatedTodos); // Set the updated todos state
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
        <div className='p-6 lg:h-screen'>
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
                                        onChange={((e) => handleTodoChange(index, 'description', e.target.value))} />
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
                        type='button'
                        className='btn bg-green-500 hover:bg-green-600 text-white'
                        onClick={addTask}>
                        Add Task
                    </button>
                    <div className='flex justify-center pt-10'>
                        <button type='submit' className='btn btn-sm px-6 btn-primary'>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProject;
