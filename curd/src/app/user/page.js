import Link from 'next/link';
import React from 'react'
import DeleteUser from '../../util/DeleteUser';

const getUser = async () => {
    let data = await fetch("http://localhost:3002/api/server");
    data = await data.json();
    return data
}

const userInfo = async () => {
    const user = await getUser();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-orange-700">User Listing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.map((a) => (
                    <div key={a.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between">
                        <span>
                        <Link className="font-semibold text-lg" href={`user/${a.id}`}>{a.name}</Link>
                        </span>
                        <span className='text-blue-500'>
                        <Link className="font-semibold text-lg" href={`user/${a.id}/update`}>Edit</Link>
                        </span>
                        <DeleteUser id={a.id}/>
                        {/* You can add more user information here */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default userInfo