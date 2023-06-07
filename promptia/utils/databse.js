import mongoose from "mongoose";

let isConnected = false; //&   This Helps us to ___Track The Connection___

export const connectDB = async() => {
    mongoose.set('strictQuery', true); //sets mongoose options. if we not do this we get warning

    if(isConnected){
        console.log('mongoose is connected, already')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share-prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log(' mongoDB connected! ')
    } catch (error) {
        console.log(error);
    }
}