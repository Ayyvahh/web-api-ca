import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavActorSchema = new Schema({
    username: { type: String },
    actor_ids: [{ type: Number }],
});

FavActorSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

export default mongoose.model('FavActor', FavActorSchema);