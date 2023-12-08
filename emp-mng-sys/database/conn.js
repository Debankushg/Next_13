//const MONGO_URI = "mongodb+srv://employeedb:admin123@cluster0.vr3cx37.mongodb.net/?retryWrites=true&w=majority";
const dburl = "mongodb+srv://employeedb:admin123@cluster0.vr3cx37.mongodb.net/employeedb?retryWrites=true&w=majority"
import mongoose from 'mongoose'

const connectMongo = async() => {
    try{
       const {connection} = await mongoose.connect(dburl)
       if(connection.readyState==1){
        console.log("Database connected");
       }

       
    }catch(error){
        return Promise.reject(error)
    }
}

export default connectMongo