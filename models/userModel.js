import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
