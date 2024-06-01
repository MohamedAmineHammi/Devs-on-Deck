const mongoose = require('mongoose')

const developerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "The First Name Is Required"]
    },
    lastName: {
        type: String,
        required: [true, "The Last Name Is Required"]
    },
    email: {
        type: String,
        required: [true, "The Email Is Required"],
        unique: true,
        lowercase: true,
    },
    city: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "The Password Is Required"],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    skills: {
        type: Array
    },
    bio: {
        type: String
    }
})

developerSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields are required')
    }
    const dev = await this.findOne({ email: email })
    if (dev) {
        if (dev.password === password) {
            return dev
        }
        throw new Error("The password is incorrect")
    }
    throw new Error("The email is incorrect")
}

const containArray = (skills, resSkills) => {
    skills = skills.map(skill => String(skill).toUpperCase());
    resSkills = resSkills.map(skill => String(skill).toUpperCase());
    let matching = 0;
    resSkills.forEach(skill => {
        if (skills.includes(skill)) { matching += 1 }
    })
    return matching
}

developerSchema.statics.getDev = async function (skills) {

    const resultArray = await this.find()
    const filteredArr = []
    const skillsLength = skills.length
    resultArray.forEach(resArr => {
        const matching = containArray(skills, resArr.skills)
        if (matching > 0 && skillsLength > 0) {
            let percentage = (matching / skillsLength) * 100 // getting the match percentage

            const { firstName, lastName, _id, skills, bio } = resArr
            let finalRes = { firstName, lastName, _id, percentage, skills, bio };
            filteredArr.push(finalRes);
        }
    })
    if (filteredArr.length > 0) return filteredArr

}
module.exports = mongoose.model('developer', developerSchema)