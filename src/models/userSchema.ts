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
    image: {
        type: String,
        required: true
    },
    places:[{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Place"
    }]

});

export default mongoose.model('User', userSchema);