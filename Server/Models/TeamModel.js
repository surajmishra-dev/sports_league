import mongoose from "mongoose";
const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    listOfTeamPlayers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("TeamModel", teamSchema);
