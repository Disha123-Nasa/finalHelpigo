import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      minlength: 10,
      maxlength: 500
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price must be a positive number"]
    },
    image: {
      type: String, // Store image URL (Cloudinary, S3, or local)
      default: "https://via.placeholder.com/300x200.png?text=No+Image"
    },
     fullDescription: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      minlength: 10,
      maxlength: 500
     }
    },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
