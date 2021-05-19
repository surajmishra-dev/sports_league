import mongoose from "mongoose";
const playerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    teamName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    teamId: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlayerModel", playerSchema);
