const { Schema, model, models, default: mongoose } = require("mongoose");
const { stringify } = require("postcss");

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required! "],
    },
    tag: {
        type: String,
        required: [true, "Tag is required! "],
    }
})

const prompt = models.prompt || model('prompt', promptSchema)

export default prompt;