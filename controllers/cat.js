import mongoose from 'mongoose';


class Cat {
    constructor() {
        this.Cat = mongoose.model('Cat')
    }

    getCat() {
        console.log(this.Cat.find({}).exec())
        return this.Cat.find({}).exec()
    }
}


export default new Cat
