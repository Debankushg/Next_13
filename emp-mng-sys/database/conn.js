import mongoose from 'mongoose'

const connectMongo = async() => {
    try{
       const {connection} = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
       if(connection.readyState==1){
        console.log("Database connected Successfully");
       }
    }catch(error){
        console.log('DataBase Connection Failed');
        return Promise.reject(error)
    }
}

export default connectMongo