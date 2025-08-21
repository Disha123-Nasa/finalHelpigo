import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));
app.use('/api/users', userRoutes);
app.use('/api/', userRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));