import FootballClub from "../models/footballClub.js";

// Create - Yangi club qo'shish
export const createFootballClub = async (req, res) => {
  try {
    const footballClub = new FootballClub(req.body);
    await footballClub.save();
    res.status(201).json(footballClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha clublarni olish
export const getFootballClubs = async (req, res) => {
  try {
    const footballClubs = await FootballClub.find();
    res.status(200).json(footballClubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta clubni olish
export const getFootballClubById = async (req, res) => {
  try {
    const footballClub = await FootballClub.findOne({ club_id: req.params.id });
    if (!footballClub)
      return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json(footballClub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Clubni yangilash
export const updateFootballClub = async (req, res) => {
  try {
    const footballClub = await FootballClub.findOneAndUpdate(
      { club_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!footballClub)
      return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json(footballClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - Clubni o'chirish
export const deleteFootballClub = async (req, res) => {
  try {
    const footballClub = await FootballClub.findOneAndDelete({
      club_id: req.params.id,
    });
    if (!footballClub)
      return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json({ message: "Club o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
