import mongoose from 'mongoose'

const accHeadSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'AccHead' },
    openingBalance: { type: Number },
    createdOn: { type: Date, default: Date.now }
});

const data = [
    { name: "Assets", type: null, openingBalance: 0 },
    { name: "Liabilities", type: null, openingBalance: 0 },
    { name: "Equity", type: null, openingBalance: 0 },
    { name: "Income", type: null, openingBalance: 0 },
    { name: "Expense", type: null, openingBalance: 0 },
]


class AccHead {
    constructor() {
        this.accHead = mongoose.model('AccHead', accHeadSchema)
        data.map((d) => {
            this.items = new this.accHead(d)
            this.items.save();
        })
    }

    gettypeHead(type) {
        return new Promise((resolve, reject) => {
            this.accHead
                .find(type
                    ? { 'name': type }
                    : { 'type': null }, (err, data) => {
                        if (err) reject(err);
                        resolve(data);
                    })
        })
    }

    addChildHead(data) {
        let d = new this.accHead(data)
        d.save();
    }

    getChildHead(type) {
        return new Promise((resolve, reject) => {
            this.gettypeHead(type)
                .then((data) => {
                    console.log(data)
                    this.accHead.find({'type': data[0]._id}, (err, data) => {
                        if (err) reject(err);
                        resolve(data)
                    })
                })
        })
    }

    addHead(data) {

    }




}

export default new AccHead