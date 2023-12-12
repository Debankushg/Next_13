import connectMongo from "../../../database/conn"
import Registration from "../../../model/registration"
import { hash } from 'bcryptjs'

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

    if (req.method === 'POST') {

        if (!req.body) return res.status(404).json({ error: "Dont have Form Data" });
        const { username, email, password } = req.body;

        //check duplicate users
        const checkExisting = await Registration.findOne({ email:email });
        if (checkExisting) return res.status(422).json({ message: "User Already Exists..!" })

        //hash Password
        const data = await Registration.create({ username, email, password: await hash(password, 12) })
        return data


    } else {
        res.status(500).json({ message: "HTTP method not valid only POST Accepted" })
    }
}



