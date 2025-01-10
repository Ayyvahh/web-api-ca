import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true },
});

UserSchema.methods.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
}

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};



UserSchema.pre('save', async function(next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified('password') || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }

    } else {
        next();
    }
});


const passwordValidator = (password) => {
    const pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return pwdPattern.test(password);
};

UserSchema.path("password").validate({
    validator: passwordValidator,
});


export default mongoose.model('User', UserSchema);
