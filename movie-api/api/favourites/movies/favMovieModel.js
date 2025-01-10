import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavMovieSchema = new Schema({
    username: { type: String },
    movie_ids: [{ type: Number }],
});

FavMovieSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

export default mongoose.model('FavMovie', FavMovieSchema);