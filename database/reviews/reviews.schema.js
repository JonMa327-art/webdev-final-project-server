import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    title: String, // change to omdb
    imdbID: String,
    review: String,
    rating: String,
    username: String,
}, {collection: 'reviews'});

export default reviewsSchema
