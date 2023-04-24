import mongoose from "../utils/mongoose.js";

const QuestionSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true,
    },
    title: {
        type: String,
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
    answersQuantity: {
        type: Number,
        required: true,
    },
    paragraphs: {
        type: [String],
        required: true,
    },
    
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;