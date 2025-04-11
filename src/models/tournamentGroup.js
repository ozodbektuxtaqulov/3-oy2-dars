import mongoose from "mongoose";

const tournamentGroupSchema = new mongoose.Schema({
  group_id: { type: Number, required: true, unique: true },
  group_name: { type: String, required: true, maxlength: 100 },
  tournament_id: { type: Number, required: true, ref: "Tournament" },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("TournamentGroup", tournamentGroupSchema);
