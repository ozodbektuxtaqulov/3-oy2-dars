import Tournament from "../models/tournament.js";

// Create - Yangi turnir qo'shish
export const createTournament = async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha turnirlarni olish
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta turnirni olish
export const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findOne({
      tournament_id: req.params.id,
    });
    if (!tournament)
      return res.status(404).json({ message: "Turnir topilmadi" });
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Turnirni yangilash
export const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findOneAndUpdate(
      { tournament_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!tournament)
      return res.status(404).json({ message: "Turnir topilmadi" });
    res.status(200).json(tournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - Turnirni o'chirish
export const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findOneAndDelete({
      tournament_id: req.params.id,
    });
    if (!tournament)
      return res.status(404).json({ message: "Turnir topilmadi" });
    res.status(200).json({ message: "Turnir o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
