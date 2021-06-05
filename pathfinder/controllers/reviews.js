const School = require('../models/school');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const school = await School.findById(req.params.id);
    const review = new Review(req.body.review);
    review.admin = req.user._id;
    school.reviews.push(review);
    await review.save();
    await school.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/schools/${school._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await School.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/schools/${id}`);
};