import mongoose from "mongoose";

const footballClubSchema = new mongoose.Schema({
  club_id: { type: Number, required: true, unique: true },
  club_name: { type: String, required: true, maxlength: 100 },
  city: { type: String, required: true, maxlength: 100 },
  country: { type: String, required: true, maxlength: 100 },
  founded_year: { type: Number, required: true },
});

export default mongoose.model("FootballClub", footballClubSchema);
