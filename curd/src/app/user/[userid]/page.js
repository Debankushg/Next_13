import React from 'react'


const getUser = async (id) => {
    let data = await fetch(`http://localhost:3000/api/server/${id}`);
    data = await data.json();
    return data.result

}


const userId = async ({ params }) => {

    const user = await getUser(params.userid)
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">User Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Personal Information</h3>
          <p className="text-base">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="text-base">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p className="text-base">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Contact</h3>
          <p className="text-base">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="text-base">
            <span className="font-semibold">Website:</span> {user.website}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-indigo-600 mb-2">Address</h3>
        <p className="text-base">
          <span className="font-semibold">Street:</span> {user.address.street}
        </p>
        <p className="text-base">
          <span className="font-semibold">Suite:</span> {user.address.suite}
        </p>
        <p className="text-base">
          <span className="font-semibold">City:</span> {user.address.city}
        </p>
        <p className="text-base">
          <span className="font-semibold">Zipcode:</span> {user.address.zipcode}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-indigo-600 mb-2">Geo Location</h3>
        <p className="text-base">
          <span className="font-semibold">Latitude:</span> {user.address.geo.lat}
        </p>
        <p className="text-base">
          <span className="font-semibold">Longitude:</span> {user.address.geo.lng}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-indigo-600 mb-2">Company</h3>
        <p className="text-base">
          <span className="font-semibold">Company Name:</span> {user.company.name}
        </p>
        <p className="text-base">
          <span className="font-semibold">Catch Phrase:</span> {user.company.catchPhrase}
        </p>
        <p className="text-base">
          <span className="font-semibold">Business:</span> {user.company.bs}
        </p>
      </div>
    </div>
    )
}

export default userId