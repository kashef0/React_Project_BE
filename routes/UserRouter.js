const express = require('express');
const { singUp, signin, signUp } = require('../controllers/UserConstroller');
const auth = require('../auth/Auth');

const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signin);

module.exports = router;