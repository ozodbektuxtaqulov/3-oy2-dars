import express from "express";
import TournamentGroup from "../models/tournamentGroup.js";

const router = express.Router();

// CREATE - Yangi turnir guruhini qo'shish
router.post("/", async (req, res) => {
  try {
    const group = new TournamentGroup(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Barcha turnir guruhlarini olish
router.get("/", async (req, res) => {
  try {
    const groups = await TournamentGroup.find().populate("tournament_id");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Bitta guruhni ID bo'yicha olish
router.get("/:id", async (req, res) => {
  try {
    const group = await TournamentGroup.findOne({
      group_id: req.params.id,
    }).populate("tournament_id");
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Guruhni yangilash
router.put("/:id", async (req, res) => {
  try {
    const group = await TournamentGroup.findOneAndUpdate(
      { group_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Guruhni o'chirish
router.delete("/:id", async (req, res) => {
  try {
    const group = await TournamentGroup.findOneAndDelete({
      group_id: req.params.id,
    });
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json({ message: "Guruh o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
