import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, ' email already exists! '],
        required: [true, ' email required! '],
    },
    username: {
        type: String,
        required: [true, ' username required! '],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

//todo_INFORMATION

//* The 'MODELS' object is provided by mongoose liabrary and stores all the registered models.

//* if the model names 'USER' already exists in the 'MODELS' object, it assigns the existing models to the 'USER' variable.

//* This prevents redefining the model ensures that existing model is reused.

//* If a model named 'USER' does not exist in the "MODELS" object, the "MODEL" function from mongoose is called to create new model.

//* the newly created model is then assigned to the "USER" variable.
let User = models.user || model("User", UserSchema)

export default User;    