import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "This first name field is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "This last name field is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "This email field is required"],
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ]
  },
  password: {
    type: String,
    required: [true, "This field is required"],
    minLength: [6, "Password must be up to 6 characters"],
  },
  phone: {
    type: String,
  },
  organisations: [{
    type: Schema.Types.ObjectId,
    ref: 'Organisation',
  }]
});

export default mongoose.model('User', userSchema);
