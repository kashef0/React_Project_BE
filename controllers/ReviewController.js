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

    const {bookId} = req.params;
    if (!bookId) {
        return res.status(404).json({message: "review med angivna id hittades ej..."});
    }
    try {
        const reviews = await Review.find({ bookId });
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'Inga recensioner hittades för denna boken' });
        }

        res.json({review: reviews});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUserReviews = async (req, res) => {
    try {
        const { userId } = req.params;

        const reviews = await Review.find({ userId }).populate('userId', 'username'); 

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'Inga recensioner hittades för denna användare' });
        }

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.createReview = async (req, res) => {
    const {bookId, reviewText, rating} = req.body;
    const userId = req.user.id;
    if (!bookId || !reviewText || !rating) {
        return res.status(400).json({ message: "alla fält måste fyllas..." });
    }
    try {
        const excitingReview = await Review.findOne({bookId, userId})
        if (excitingReview) {
            return res.status(400).json({message: "Du har redan recenserat den här boken.." })
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
        res.status(201).json({ message: "Recensionen har skapats", review });
        
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