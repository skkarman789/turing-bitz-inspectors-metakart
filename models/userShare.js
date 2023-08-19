import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userShare = mongoose.model('Share', shareSchema);

export default userShare;
