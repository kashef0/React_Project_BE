const express = require('express');
const {getReviews, getReviewByBookId, createReview, updateReview, deleteReview} = require('../controllers/ReviewController');
const Auth = require('../auth/Auth');


const router = express.Router();

router.get("/", getReviews);
router.get("/:id", Auth, getReviewByBookId);
router.post("/create", Auth, createReview);
router.put("/update/:id", Auth, updateReview);
router.delete("/delete/:id", Auth, deleteReview);


module.exports = router;