const mongoose = require('mongoose')

const startDb = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/DevsOnDeck`)
        console.log('Connected to the database')
    }catch (err) {
        console.log(err)
    }
}

startDb()