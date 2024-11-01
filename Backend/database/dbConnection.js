import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RESTAURANT",
        });
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`Error connecting to the database: ${err.message}`);
        throw err; // Or handle it with your error middleware
    }
};
