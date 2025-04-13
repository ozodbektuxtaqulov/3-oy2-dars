import Player from "../models/player.js";

// Create - Yangi o'yinchi qo'shish
export const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha o'yinchilarni olish
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team_id");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta o'yinchini olish
export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findOne({ player_id: req.params.id }).populate(
      "team_id"
    );
    if (!player) return res.status(404).json({ message: "O'yinchi topilmadi" });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - O'yinchini yangilash
export const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { player_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!player) return res.status(404).json({ message: "O'yinchi topilmadi" });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - O'yinchini o'chirish
export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findOneAndDelete({ player_id: req.params.id });
    if (!player) return res.status(404).json({ message: "O'yinchi topilmadi" });
    res.status(200).json({ message: "O'yinchi o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
