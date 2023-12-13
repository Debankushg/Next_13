import React from 'react'
import { PieChart, Pie, Cell, Legend, BarChart, Bar, ResponsiveContainer,XAxis,Tooltip } from "recharts";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${value}`}
        </text>
    );
};

const Dashboard = () => {

    const { data, isLoading, isError, error } = useQuery('users', getUsers)


    return (
        <div>
            <main className="container mx-auto text-center py-20">
                <div className='w-4/5 m-auto'>
                    <div className='mt-10'>
                        <div className="basis-[50%] grid grid-cols-2 grid-rows-2 gap-4">

                            <div className={`block rounded-md p-6  bg-[#3d3a4a] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] relative h-[330px]`}>
                                <h1 className='text-2xl text-white'>Employee Active Status:</h1>
                                {/* { state.totalReaders > 0 ? ( */}
                                {/* <ResponsiveContainer width="100%" height="93%"> */}
                                <PieChart width={230} height={230} className="m-auto">
                                    <Pie
                                        data={data?.activeStatus?.data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        fill="#8884d8"
                                        innerRadius={60}
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                    >
                                        {data?.activeStatus?.data.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                                {/* </ResponsiveContainer> */}

                                {/* ) : ( */}
                                {/* <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded relative top-20" role="alert">
              <span className="block sm:inline font-bold text-lg">No readers available for the graph.</span>
            </div> */}
                                {/* )} */}
                            </div>
                            <div className={`block rounded-md p-6  bg-[#3d3a4a] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] relative h-[330px]`}>
                                <h1 className='text-2xl text-white'>Employee Inactive Status:</h1>
                                {/* { state.totalReaders > 0 ? ( */}
                                {/* <ResponsiveContainer width="100%" height="93%"> */}
                                    <PieChart width={230} height={230} className="m-auto">
                                        <Pie
                                            data={data?.inactiveStatus?.data}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={90}
                                            fill="#8884d8"
                                            innerRadius={60}
                                            label={renderCustomizedLabel}
                                            labelLine={false}
                                        >
                                            {data?.inactiveStatus?.data.map((entry, index) => (
                                                <Cell key={index} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                {/* </ResponsiveContainer> */}
                                {/* ) : ( */}
                                {/* <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded relative top-20" role="alert">
              <span className="block sm:inline font-bold text-lg">No readers available for the graph.</span>
            </div> */}
                                {/* )} */}
                            </div>
                            <div className={`block rounded-md p-6 bg-[#3d3a4a] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] relative bottom-[170px] w-[204%]`}>
                                <h1 className='text-white text-left text-2xl'>Salary Status:</h1>
                                {/* { state.totalReaders > 0 ? ( */}
                                <ResponsiveContainer width="100%" height="93%" padding= "40px" className="p-[40px]">
                                <BarChart width={150} height={40} data={data?.salary}>
                                <Tooltip/>
                                <XAxis dataKey="name" />
                                    <Bar dataKey="salary" fill="#9099ad"  nameKey="name" />
                                </BarChart>
                                </ResponsiveContainer>

                                {/* ) : ( */}
                                {/* <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded relative top-20" role="alert">
              <span className="block sm:inline font-bold text-lg">No readers available for the graph.</span>
            </div> */}
                                {/* )} */}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard