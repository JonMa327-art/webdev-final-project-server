import reviewsDao from "../database/reviews/reviews_dao.js";
import reviewsModel from "../database/reviews/reviews_model.js";

const findAllReviews = async (req, res) => {
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
}

const createReview = async (req, res) => {
    const newReview = req.body;
    const insertedReview = await reviewsDao.createReview(newReview);
    res.json(insertedReview);
}

const deleteReview = async (req, res) => {
    const reviewID = req.params.reviewID;
    const status = await reviewsDao.deleteReview(reviewID);
    res.send(status);
}

const updateReview = async (req, res) => {
    const reviewID = req.params.reviewID;
    const review = req.body;
    const status = await reviewsDao.updateReview(reviewID, review);
    res.send(status);
}

export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findAllReviews);
    app.put('/api/reviews/:reviewID', updateReview);
    app.delete('/api/reviews/:reviewID', deleteReview);
}
