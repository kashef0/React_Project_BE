const express = require('express');
const Review = require('../models/Review');
const mongoose = require('mongoose');


exports.getReviews = async (req, res) => {

    try {
        const reviews = await Review.find({
            review: req.Review
        });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



exports.getReviewByBookId = async (req, res) => {

    const bookId = req.params.id;
    if (!bookId) {
        return res.status(404).json({message: "review med angivna id hittades ej..."});
    }
    try {
        const reviews = await Review.find({ bookId }).populate("userId", "username");
        res.json({review: reviews});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.createReview = async (req, res) => {
    const {bookId, reviewText, rating} = req.body;
    const userId = req.user.id;
    try {
        const excitingReview = await Review.findOne({bookId: bookId})
        if (excitingReview) {
            return res.status(400).json({message: "review finns redan." })
        }
        const review = new Review({
            bookId,
            userId,
            reviewText,
            rating
        });

        if (!review) {
            return res.status(400).json({message: "något fel händer..."})
        }
        await review.save();
        res.json(review);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};


exports.updateReview = async (req, res) => {
    const review = req.params.id;
    if (!review) {
        return res.status(404).json({message: "book med angivna id hittades ej..."});
    }

    try {
        if (review.userId !== req.userid) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updateReview = await Review.findByIdAndUpdate(review);

        updateReview.reviewText= req.body.reviewText;
        updateReview.rating = req.body.rating;

        await updateReview.save();
        res.json({updateReview, message: "data har uppdaterats...."});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.deleteReview = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "ogiltigt id försök igen senare..."
        })
    }
    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "kunde inte hitta Review" });
        }

        return res.json({
            message: "Review har raderats..."
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}