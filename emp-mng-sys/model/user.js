import { Schema, model, models } from "mongoose"


const userSchema = new Schema({
    name: {type:String,unique:true},
    avatar: String,
    email: String,
    salary: String,
    date: String,
    status: String

})

const Users = models.user || model('user', userSchema)
export default Users