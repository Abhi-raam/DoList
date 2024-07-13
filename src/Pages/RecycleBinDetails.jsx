import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { useLocation, useNavigate } from 'react-router-dom';
import {  deleteProject, getRecycleBinItemById, restoreBinItem } from '../Helpers/UserHelpers';
import TodoTable from '../Components/TodoTable';
import BinTable from '../Components/BinTable';
import BinNormal from '../Components/BinNormal';


function RecycleBinDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const projectId = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchBinProjectDetails = async () => {
      try {
        const projectData = await getRecycleBinItemById(projectId)
        // console.log(projectData);
        setProject(projectData)
      } catch (error) {
        console.log('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBinProjectDetails()
  }, [location.pathname])

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      await deleteProject(projectId); 
      navigate("/recyclebin"); 
    } catch (error) {
      console.error("Error deleting project:", error); // Handle errors
    }finally{
      setLoading(false);
    }
  };

  const restore = ()=>{
    try{
      setLoading(true)
      restoreBinItem(project,projectId)
      navigate("/recyclebin")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='pt-20'>
      <div className='px-5'>
        <h2 className='text-2xl font-semibold'>Project name : {project.projectName}</h2>
        <div className='flex justify-end gap-2 pt-4'>
          
          <button onClick={handleDeleteProject}  className='text-red-600 flex items-center justify-center gap-2 border border-red-700 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
            <RiDeleteBin6Line />
            <p>Delete</p>
          </button>
          <button onClick={restore}  className='text-violet-600 flex items-center justify-center gap-2 border border-violet-700 rounded-md px-3 hover:bg-slate-100 btn-sm md:btn-md'>
            <LiaTrashRestoreAltSolid size={18} />
            <p>Restore</p>
          </button>
         

        </div>
      </div>
      <div className='hidden md:block'>
        <BinTable  project={project}/>
      </div>
      <div className='block md:hidden'>
        <BinNormal project={project}/>
      </div>
    </div>
  );
}

export default RecycleBinDetails;
