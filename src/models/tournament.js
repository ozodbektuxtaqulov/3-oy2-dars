import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  tournament_id: { type: Number, required: true, unique: true },
  tournament_name: { type: String, required: true, maxlength: 100 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, required: true, maxlength: 20 },
});

export default mongoose.model("Tournament", tournamentSchema);
