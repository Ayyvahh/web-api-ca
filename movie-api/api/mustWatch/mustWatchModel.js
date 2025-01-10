import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MustWatchMovieSchema = new Schema({
    username: { type: String },
    movie_ids: [{ type: Number }],
});

MustWatchMovieSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

export default mongoose.model('MustWatchMovie', MustWatchMovieSchema);