import mongoose from 'mongoose'

export default async function connect() {

    try {
        const { connection } = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

        if (connection.readyState === 1) {
            console.log("dataBase connected")
        }
    } catch (error) {
        console.log('DataBase Connection Failed');
        return Promise.reject(error)
    }

}