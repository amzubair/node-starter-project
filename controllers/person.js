import mongoose from 'mongoose'

const personSchema = mongoose.Schema({
    name: String,
    age: Number
})

class Person {
    constructor() {
        this.person = mongoose.model('Person', personSchema)
    }

    addPerson(data) {
        const person = new this.person(data)
        person.save((err, data) => {
            if (err) return console.log(err)
            console.log(data)
        })
    }

    getPerson() {
        return new Promise((resolve, reject) => {
            this.person.find({}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

}

export default new Person