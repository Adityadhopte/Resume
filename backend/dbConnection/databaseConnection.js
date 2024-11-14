import mongoose from "mongoose";

const dbConnection = () => {
    console.log("Attempting to connect to MongoDB...");
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "PORTFOLIO"
    })
    .then(() => {
        console.log("Connected to database successfully!");
    })
    .catch((error) => {
        console.error(`Database connection error: ${error.message}`);
    });
};


export default dbConnection
