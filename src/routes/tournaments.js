import express from "express";
import Tournament from "../models/tournament.js";

const router = express.Router();

// CREATE - Yangi turnir qo'shish
router.post("/", async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Barcha turnirlarni olish
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Bitta turnirni ID bo'yicha olish
router.get("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findOne({
      tournament_id: req.params.id,
    });
    if (!tournament)
      return res.status(404).json({ message: "Turnir topilmadi" });
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Turnirni yangilash
router.put("/:id", async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Turnirni o'chirish
router.delete("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findOneAndDelete({
      tournament_id: req.params.id,
    });
    if (!tournament)
      return res.status(404).json({ message: "Turnir topilmadi" });
    res.status(200).json({ message: "Turnir o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
