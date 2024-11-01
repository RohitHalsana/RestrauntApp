import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import reservationRouter from "./routes/reservationRoute.js";
import { errorMiddleware } from "./Middleware/error.js";

const app = express();
dotenv.config({ path: "./config/.env" });

// CORS middleware setup
app.use(cors({
    origin: [process.env.FRONTEND_URL], // Ensure FRONTENDURL is set to 'http://localhost:5173'
    methods: ["GET", "POST", "OPTIONS"], // OPTIONS is necessary for preflight
    credentials: true,
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection();

// Routes and error middleware
app.use("/api/v1/reservation", reservationRouter);
app.use(errorMiddleware);

export default app;
