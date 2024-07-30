import mongoose from 'mongoose';

const WaitListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

WaitListSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("WaitList", WaitListSchema);
