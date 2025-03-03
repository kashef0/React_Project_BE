const express = require('express');
const { signin, signUp, getUser } = require('../controllers/UserConstroller');

const router = express.Router();


router.get("/", getUser);
router.post("/signup", signUp);
router.post("/signin", signin);

module.exports = router;