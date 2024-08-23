import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteProject, getProjectById, moveToRecyclebin, updateProjectTodos } from '../Helpers/UserHelpers';
import { InfinitySpin } from 'react-loader-spinner';
import { FaPlus } from 'react-icons/fa';
import { CiEdit,CiExport } from "react-icons/ci";
import { RiDeleteBin6Line } from 'react-icons/ri';
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
    const currentTimestamp = Date.now();

    const updatedTodos = project.todos.map((todo, idx) =>
      idx === index
        ? { ...todo, status: newStatus, updatedOn: currentTimestamp }
        : todo
    );

    const updatedProject = {
      ...project,
      todos: updatedTodos,
      updatedOn: currentTimestamp,
    };

    setProject(updatedProject);

    try {
      await updateProjectTodos(projectId, {
        todos: updatedTodos,
        updatedOn: currentTimestamp,
      });
    } catch (error) {
      console.error("Error updating project todos:", error);
    }
  };

  // const handleDeleteProject = async () => {
  //   try {
  //     setLoading(true);
  //     await deleteProject(projectId); 
  //     navigate("/projects"); 
  //   } catch (error) {
  //     console.error("Error deleting project:", error); // Handle errors
  //   }finally{
  //     setLoading(false);
  //   }
  // };
  const moveToRecycle =  ()=>{
    try{
      setLoading(true)
      moveToRecyclebin(project,projectId)
      navigate("/projects");
    }finally{
      setLoading(false)
    }
  }



  function projectToMarkdown(project) {
    let markdown = `# ${project.projectName}\n\n`;
    const totalTodos = project.todos.length;
    const completedTodos = project.todos.filter((todo) => todo.status).length;
    markdown += `**Summary**: ${completedTodos} / ${totalTodos} completed\n\n`;
    markdown += `## Pending Tasks\n`;
    project.todos
      .filter((todo) => !todo.status)
      .forEach((todo, index) => {
        markdown += `- [ ] ${todo.name}\n`;
      });

    markdown += `## Completed Tasks\n`;
    project.todos
      .filter((todo) => todo.status)
      .forEach((todo, index) => {
        markdown += `- [x] ${todo.name}\n`;
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
    <div className='pt-20 min-h-screen'>
      <div className='px-5'>
        <h2 className='text-2xl font-semibold'>Project Name : {project.projectName}</h2>
        <div className='flex justify-end gap-2 pt-4'>
          <Link to={`/edit-project/${projectId}`}>
            <button className='text-violet-600 flex items-center gap-3 border border-violet-700 p-1 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
              <CiEdit size={20}  className='text-xs'/>
              <p className='max-sm:text-xs'>Edit</p>
            </button>
          </Link>
          {/* <button onClick={handleDeleteProject}  className='text-red-600 flex items-center justify-center gap-2 border border-red-700 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
            <RiDeleteBin6Line />
            <p>Delete</p>
          </button> */}
          <button onClick={moveToRecycle}  className='text-red-600 flex items-center justify-center gap-2 border border-red-700 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
            <RiDeleteBin6Line />
            <p className='max-sm:text-xs'>Move to RecycleBin</p>
          </button>
          <button onClick={downloadMarkdown} className='text-violet-600 flex items-center gap-3 border border-violet-700 p-1 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
            <CiExport size={20} className='text-xs'/>
            <p className='max-sm:text-xs'>Export as gist</p>
          </button>

        </div>
      </div>
      <div className='hidden md:block'>
        <TodoTable projectId={projectId} project={project} updateTodoStatus={updateTodoStatus} setProject={setProject} />
      </div>
      <div className='block md:hidden'>
        <TodoNormal project={project} updateTodoStatus={updateTodoStatus} setProject={setProject} />
      </div>
    </div>
  )
}

export default ProjectDetails