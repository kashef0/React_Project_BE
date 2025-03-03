const User =require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.getUser = async (req, res) => {
    try {
        const users = await User.find(req.User)
        if (!users) {
            return res.status(404).json({message: "det finns inga användare..."})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.signUp = async (req, res) => {
    try {
        const {username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message: 'Alla fält är obligatoriska.'})
        }

        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(400).json({message: "E-postadressen används redan." })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashPassword
        })
        await newUser.save();
        res.status(201).json({ message: "Användaren har registrerats."})
    } catch (error) {
        res.status(500).json({ message: "Serverfel.", error: error.message });
    }
}


exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-post och lösenord krävs." });
        }

        const user = await User.findOne({email: email.toLowerCase()})
        if (!user) {
            return res.status(401).json({ message: "Felaktig e-post eller lösenord." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Felaktig e-post eller lösenord." });
        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.status(200).json({
            message: "Inloggad.",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        })
    } catch (error) {
        res.status(500).json({ message: "Serverfel.", error: error.message });
    }
}