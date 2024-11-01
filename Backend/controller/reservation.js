import ErrorHandler from "../Middleware/error.js";
import { Reservation } from "../models/reservationSchema.js";


const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  // Check for missing fields
  const missingFields = [];
  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (!email) missingFields.push("email");
  if (!date) missingFields.push("date");
  if (!time) missingFields.push("time");
  if (!phone) missingFields.push("phone");

  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Please fill the following fields: ${missingFields.join(", ")}`, 400));
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Invalid email format.", 400));
  }

  // Validate date format
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return next(new ErrorHandler("Invalid date format.", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    return res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Log unexpected errors
    console.error("Unexpected Error:", error);
    return next(new ErrorHandler("Internal server error!", 500));
  }
};

export default send_reservation;
