import mongoose from 'mongoose';
import colour from 'colour'
import fs from 'fs'

import Person from 'person-service'
import Accounting from './controllers/accHead'


const database = class Database {

    constructor() {
        mongoose.Promise = global.Promise;

    }

    connect(uri, seed) {
        mongoose.connect(uri)
        mongoose.connection.once('open', () => {
            console.log(colour.green(`Database: ${uri}`))

        })

        this.destroyDb()
        if (seed) {
            this.seed(seed)
        }


    }

    destroyDb() {
        mongoose.modelNames().map((model) => {
            if (model) {
                mongoose.model(model).remove(() => {
                    console.log(`Deleting: ${model}`)
                })
            }
        })
    }

    seed(seed) {

        if (!seed) return false;

        // const data = JSON.parse(fs.readFileSync(seed));

    


    }
}

export default new database;