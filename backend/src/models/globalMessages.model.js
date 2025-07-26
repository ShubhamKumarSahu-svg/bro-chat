import mongoose from 'mongoose';

const globalMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      secure_url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const GlobalMessage = mongoose.model('GlobalMessage', globalMessageSchema);
export default GlobalMessage;
