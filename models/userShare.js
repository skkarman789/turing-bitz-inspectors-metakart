import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    chainAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userShare = mongoose.model('userShare', shareSchema);

export default userShare;
