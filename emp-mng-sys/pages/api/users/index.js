import connectMongo from "../../../database/conn"
import { getUsers, postUsers, putUsers, deleteUsers } from "../../../database/controller"


export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }))

    // type of request
    const { method } = req

    switch (method) {
        case 'GET':
            getUsers(req, res)
            break;
        case 'POST':
            postUsers(req, res)
            break;
        case 'PUT':
            putUsers(req, res)
            // res.status(200).json({ method, name: 'PUT Request' });
            break;
        case 'DELETE':
            deleteUsers(req, res)
            // res.status(200).json({ method, name: 'DELETE Request' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowd`)
            break;
    }
}