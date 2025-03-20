const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Vänligen ange en giltig e-postadress']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'], // Minimum length validation
        maxlength: [20, 'Password must not exceed 20 characters'], // Maximum length validation
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken.'],
    }
})

module.exports = mongoose.model("User", userSchema);