const mongoose = require('mongoose')
const orgSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, "Organization name is required"]
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is Required']
    },
    email: {
        type: String,
        required: [true, "The Email is Required"],
        unique: true,
        lowercase: true,
    },
    org: {
        orgCity: {
            type: String
        },
        orgAddress: {
            type: String,
        },
        orgState: {
            type: String
        }
    },
    password: {
        type: String,
        required: [true, 'The Password is Required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    positions: [{
        name: {
            type: String
        },
        description: {
            type: String
        },
        skills: {
            type: Array
        }
    }
    ]
});

orgSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw new Error('All fields are required')
    }
    const org = await this.findOne({ email: email })
    if (org) {
        if (org.password === password) {
            return org
        }
        throw new Error("The password is incorrect")
    }
    throw new Error("The email is incorrect")

}

orgSchema.statics.getPositionArray = async function (newPositionn, id) {
    const resultArray = await this.find({ _id: id })

    if (resultArray) {
        return resultArray[0]
    } else {
        throw new Error('Not Found')
    }



}

module.exports = mongoose.model("organization", orgSchema)