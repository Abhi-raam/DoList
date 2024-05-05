import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProjectById, updateProjectTodos } from '../Helpers/UserHelpers';
import { InfinitySpin } from 'react-loader-spinner';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import TodoTable from '../Components/TodoTable';
import TodoNormal from '../Components/TodoNormal';

function ProjectDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const projectId = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectData = await getProjectById(projectId)
        console.log(projectData);
        setProject(projectData)
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjectDetails()
  }, [location.pathname])

  const updateTodoStatus = async (index, newStatus) => { 
    const currentTimestamp = Date.now(); // Get the current timestamp
    
    // Copy the current todos and update the status and 'updatedOn' for the specific todo
    const updatedTodos = project.todos.map((todo, idx) => 
      idx === index
        ? { ...todo, status: newStatus, updatedOn: currentTimestamp } // Only update the specific todo
        : todo // Keep other todos unchanged
    );
  
    const updatedProject = {
      ...project,
      todos: updatedTodos, // Set the updated todos
      updatedOn: currentTimestamp, // Optionally update project's 'updatedOn'
    };
  
    setProject(updatedProject); // Update the project state
    
    try {
      await updateProjectTodos(projectId, {
        todos: updatedTodos, // Persist the updated todos
        updatedOn: currentTimestamp, // Optionally persist project's 'updatedOn'
      }); // Persist changes
    } catch (error) {
      console.error("Error updating project todos:", error); // Handle update error
    }
  };
  
  
  
  function projectToMarkdown(project) {
    let markdown = `# ${project.projectName}\n\n`; 
    const totalTodos = project.todos.length;
    const completedTodos = project.todos.filter((todo) => todo.status).length;
    markdown += `**Summary**: ${completedTodos} / ${totalTodos} completed\n\n`;
    markdown += `## Pending Tasks\n`;
    project.todos
      .filter((todo) => !todo.status) 
      .forEach((todo, index) => {
        markdown += `- [ ] ${todo.name}: ${todo.description}\n`;
      });
  
    markdown += `## Completed Tasks\n`;
    project.todos
      .filter((todo) => todo.status) 
      .forEach((todo, index) => {
        markdown += `- [x] ${todo.name}: ${todo.description}\n`; 
      });
  
    return markdown;
  }
  

  const downloadMarkdown = () => {
    const markdown = projectToMarkdown(project);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.projectName}.md`; 
    a.click();
    URL.revokeObjectURL(url); 
  };
  

  if (loading) {
    return (
      <div className='items-center h-[90vh] justify-center flex'>
        <InfinitySpin width='200' color='#7365b7' />
      </div>
    );
  }
  return (
    <div className='pt-20'>
      <div className='px-5'>
        <h2 className='text-2xl font-semibold'>Project name : {project.projectName}</h2>
        <div className='flex justify-end gap-2 pt-4'>
          <Link to={`/edit-project/${projectId}`}>
            <button className='text-violet-600 flex items-center gap-3 border border-violet-700 p-1 rounded-md px-3 hover:bg-slate-100'>
              <FaPlus />Edit
            </button>
          </Link>
            <button onClick={downloadMarkdown} className='text-violet-600 flex items-center gap-3 border border-violet-700 p-1 rounded-md px-3 hover:bg-slate-100'>
              <FaPlus />Export as gist
            </button>
  
        </div>
      </div>
      <div className='hidden md:block'>
        <TodoTable project={project} updateTodoStatus={updateTodoStatus} />
      </div>
      <div className='block md:hidden'>
        <TodoNormal project={project} updateTodoStatus={updateTodoStatus} />
      </div>
    </div>
  )
}

export default ProjectDetails