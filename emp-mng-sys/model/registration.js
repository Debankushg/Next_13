import { Schema, model, models } from "mongoose"

const registrationSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const Registration = models.registration || model('registration',registrationSchema,'registrations')
export default Registration