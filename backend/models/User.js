import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
 name: String,
 email: {type:String,unique:true},
 password: String,
 role:{type: String,
enum: ["user", "admin"], // ✅ restricts role to valid values
      default: "user" }
}, { timestamps: true });
export default mongoose.model('User', userSchema);