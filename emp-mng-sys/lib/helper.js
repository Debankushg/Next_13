
const BASE_URL = "http://localhost:3000"

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`)
    const json = await response.json()

    return json;
}

//get Single User
export const getUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`)
    const json = await response.json()

    if (json) return json;
    return {}
}


//posting new User
export const addUser = async (formData) => {
    try {
        const Data = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${BASE_URL}/api/users`, Data)
        const json = await res.json()
        return json


    } catch (error) {
        return error
    }
}


// Update a new user
export async function updateUser(userId, formData) {
    const data = {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formData)
    }
    const response = await fetch(`${BASE_URL}/api/users?userId=${userId}`, data)
    const json = await response.json()
    return json;
}



// Delete a new user
export async function deleteUser(userId) {
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
    }

    const response = await fetch(`${BASE_URL}/api/users?userId=${userId}`, Options)
    const json = await response.json()
    return json;
}

// Registration
export const registerUser = async (val) => {
    try {
        const data = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(val)
        }
        await fetch(`${BASE_URL}/api/auth/signup`, data)
            .then(res => res.json())
            .then((data) => {
                if (data) router.push(`${BASE_URL}`)
            })
    } catch (err) {
        return err
    }
}