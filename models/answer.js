import mongoose from "../utils/mongoose.js";

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    content: {
        type: String,
        required: true,
    }, 
    date: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: false,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;