
import Users from '../model/user'


//GET: http://localhost:3000/api/users
export async function getUsers(req, res) {
    try {
        const users = await Users.find({})
        if (!users) return res.status(404).json({ error: "Data not Found" })
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: "Error While Fetching Data" + error })
    }
}


//GET: http://localhost:3000/api/users/userId
export async function getUser(req, res) {
    try {
        const { userId } = req.query;

        if (userId) {
            const user = await Users.findById(userId)

            res.status(200).json(user)
        }
        res.status(404).json({ error: "User Not selected" })

    } catch (error) {
        res.status(404).json({ error: "Cannot get the user..!" })
    }
}


//POST: http://localhost:3000/api/users
export async function postUsers(req, res) {
    try {
        const formData = req.body;
        if (!formData) return res.status(404).json({ error: "Form Data Not Provided...!" });
        const data = await Users.create(formData);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ error });
    }
}

//PUT: http://localhost:3000/api/users/id

export async function putUsers(req, res) {
    try {
        const { userId } = req.query;
        const formData = req.body;
        if (userId && formData) {
            await Users.findByIdAndUpdate(userId, formData)
            return res.status(200).json(formData);
        }
        res.status(404).json({ error: "User Not Selected" })
    } catch (error) {
        return res.status(404).json({ error });
    }
}

//DELETE: http://localhost:3000/api/users/id

export async function deleteUsers(req, res) {
    try {
        const { userId } = req.query;

        if (userId) {
            await Users.findByIdAndDelete(userId)
            return res.status(200).json({ deleted: userId });
        }
        res.status(404).json({ error: "User Not Selected" })
    } catch (error) {
        return res.status(404).json({ error: "Erorr while Deleting the user" });
    }
}