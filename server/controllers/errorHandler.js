const HandleErrors = (err) => {
    let errors = { email: "", password: "", fields: "" }

    if (err.message === "All fields must be filled" || err.message === "All fields are required") {
        errors.fields = err.message
    }

    if (err.code === 11000) {
        errors.email = "That email is already registered"
    }

    if (err.message === "The email is incorrect") {
        errors.email = err.message

    }

    if (err.message === "The password is incorrect") {
        errors.password = err.message
    }

    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message
        })
    }
    return errors
}

module.exports = { HandleErrors }