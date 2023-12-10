
import {MONGO_URI} from '../pages/api/process'
import mongoose from 'mongoose'

const connectMongo = async() => {
    try{
       const {connection} = await mongoose.connect(MONGO_URI)
       console.log(connection,"Connnection");
       if(connection.readyState==1){
        console.log("Database connected Successfully");
       }
    }catch(error){
        console.log('DataBase Connection Failed');
        return Promise.reject(error)
    }
}

export default connectMongo