import reviewsModel from "./reviews_model.js";

const findAllReviews = async () => {
    return reviewsModel.find();
}

const createReview = async (review) => {
    return await reviewsModel.create(review);
}

const deleteReview = async (id) => {
    return reviewsModel.deleteOne({_id: id});
}

const updateReview = async (id, updatedReview) => {
    return reviewsModel.updateOne({_id: id}, {$set: updatedReview});
}

const funcs = {
    findAllReviews,
    createReview,
    deleteReview,
    updateReview
}

export default funcs;
