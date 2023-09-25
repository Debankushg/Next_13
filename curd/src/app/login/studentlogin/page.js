"use client"
import React, { useState, useEffect } from 'react'
import { fetchData } from '../../api/getApi'


const StudentLogin = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // fetchData()
        //     .then((data) => {
        //         setData(data);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error);
        //         setLoading(false);
        //     });
        const fetchDataAsync = async () => {
            try {
                const data = await fetchData();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDataAsync();

    }, [])



    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className='bg-red-800'>
            <h1 className="text-[30px] text-orange-200 font-bold text-center p-10 ">Student List</h1>
            {loading ? <p>Loading...</p> : (data.map((item) => (
                <p key={item.id} className='pl-4 text-lg text-sky-500 leading-loose font-bold font-mono'>{item.id}.  {item.title}</p>
            )))}
        </div>
    );
}

export default StudentLogin