import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    places:{
        type: String,
        required: true
    }

});

export default mongoose.model('User', userSchema);