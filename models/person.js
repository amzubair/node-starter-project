import mongoose from 'mongoose'



const personSchema = mongoose.Schema({
    name: String,
    age: Number
})


export default mongoose.model('Person', personSchema)