import express from "express";
import FootballClub from "../models/footballClub.js";

const router = express.Router();

// CREATE - Yangi football club qo'shish
router.post("/", async (req, res) => {
  try {
    const club = new FootballClub(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Barcha football clublarni olish
router.get("/", async (req, res) => {
  try {
    const clubs = await FootballClub.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Bitta clubni ID bo'yicha olish
router.get("/:id", async (req, res) => {
  try {
    const club = await FootballClub.findOne({ club_id: req.params.id });
    if (!club) return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Clubni yangilash
router.put("/:id", async (req, res) => {
  try {
    const club = await FootballClub.findOneAndUpdate(
      { club_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!club) return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Clubni o'chirish
router.delete("/:id", async (req, res) => {
  try {
    const club = await FootballClub.findOneAndDelete({
      club_id: req.params.id,
    });
    if (!club) return res.status(404).json({ message: "Club topilmadi" });
    res.status(200).json({ message: "Club o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
