import express from "express";
import { authMiddle } from '../middleware/middleawreAuth.js';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/",authMiddle, createBooking);      // Create booking
router.get("/", getBookings);         // Get all bookings
router.get("/:id", getBookingById);   // Get booking by ID
router.put("/:id", updateBooking);    // Update booking
router.delete("/:id", deleteBooking); // Delete booking

export default router;
