import TournamentGroup from "../models/tournamentGroup.js";

// Create - Yangi guruh qo'shish
export const createTournamentGroup = async (req, res) => {
  try {
    const tournamentGroup = new TournamentGroup(req.body);
    await tournamentGroup.save();
    res.status(201).json(tournamentGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha guruhlarni olish
export const getTournamentGroups = async (req, res) => {
  try {
    const tournamentGroups = await TournamentGroup.find().populate(
      "tournament_id"
    );
    res.status(200).json(tournamentGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta guruhni olish
export const getTournamentGroupById = async (req, res) => {
  try {
    const tournamentGroup = await TournamentGroup.findOne({
      group_id: req.params.id,
    }).populate("tournament_id");
    if (!tournamentGroup)
      return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json(tournamentGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Guruhni yangilash
export const updateTournamentGroup = async (req, res) => {
  try {
    const tournamentGroup = await TournamentGroup.findOneAndUpdate(
      { group_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!tournamentGroup)
      return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json(tournamentGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - Guruhni o'chirish
export const deleteTournamentGroup = async (req, res) => {
  try {
    const tournamentGroup = await TournamentGroup.findOneAndDelete({
      group_id: req.params.id,
    });
    if (!tournamentGroup)
      return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json({ message: "Guruh o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
