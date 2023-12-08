
const BASE_URL = "http://localhost:3002"

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`)
    const json = await response.json()

    return json;
}

//get Single User
export const getUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`)
    const json = await response.json()

    if(json)return json;
    return{}
}