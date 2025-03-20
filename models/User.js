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
        minlength: [6, 'Lösenordet måste vara minst 6 tecken långt'], // Minimum length validation
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken.'
        ]
    }
})

module.exports = mongoose.model("User", userSchema);