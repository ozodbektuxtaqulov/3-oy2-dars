import Team from "../models/team.js";

// Create - Yangi jamoa qo'shish
export const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha jamoalarni olish
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("club_id").populate("group_id");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta jamoani olish
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findOne({ team_id: req.params.id })
      .populate("club_id")
      .populate("group_id");
    if (!team) return res.status(404).json({ message: "Jamoa topilmadi" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Jamoani yangilash
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { team_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!team) return res.status(404).json({ message: "Jamoa topilmadi" });
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - Jamoani o'chirish
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ team_id: req.params.id });
    if (!team) return res.status(404).json({ message: "Jamoa topilmadi" });
    res.status(200).json({ message: "Jamoa o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
