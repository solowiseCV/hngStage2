import mongoose from 'mongoose';
const { Schema } = mongoose;

const organisationSchema = new Schema({
  orgId: {
    type: String,
    unique: true,
    required: [true, "This orgId field is required"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "This name field is required"],
    trim: true,
  },
  description: {
    type: String,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

export default mongoose.model('Organisation', organisationSchema);
