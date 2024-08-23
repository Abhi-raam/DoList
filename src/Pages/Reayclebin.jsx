import React, { useEffect, useState } from 'react';
import { recyclebinItems } from '../Helpers/UserHelpers';
import { UserAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import ProjectCard from '../Components/ProjectCard';
import { InfinitySpin } from "react-loader-spinner";

function Reayclebin() {
    const { user } = UserAuth();
    const [binData, setBinData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBinData = async () => {
        try {
            setLoading(true);
            const binArray = await recyclebinItems(user.uid);
            setBinData(binArray);
        } catch (error) {
            console.error("Error fetching recycle bin items:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBinData();
    }, [user]);

    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#7365b7]">Recycle Bin</h2>
            </div>
            {loading ? (
                <div className='flex justify-center items-center h-[90vh]'>
                    <InfinitySpin width='250' color='#7365b7' />
                </div>
            ) : (
                binData.length !== 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center pt-5">
                        {binData.map((binItem, index) => (
                            <div className="w-full" key={index}>
                                <Link to={`/recyclebin-details/${binItem.id}`}>
                                    <ProjectCard project={binItem} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No data</p>
                )
            )}
        </div>
    );
}

export default Reayclebin;
