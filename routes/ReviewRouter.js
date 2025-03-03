const express = require('express');
const {getReviews, getUserReviews, getReviewByBookId, createReview, updateReview, deleteReview} = require('../controllers/ReviewController');
const Auth = require('../auth/Auth');


const router = express.Router();

router.get("/", getReviews);
router.get("/book/:bookId", Auth, getReviewByBookId);
router.get("/user/:userId", Auth, getUserReviews);
router.post("/create", Auth, createReview);
router.put("/update/:id", Auth, updateReview);
router.delete("/delete/:id", Auth, deleteReview);


module.exports = router;