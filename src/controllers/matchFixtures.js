import MatchFixture from "../models/matchFixture.js";

// Create - Yangi match fixture qo'shish
export const createMatchFixture = async (req, res) => {
  try {
    const matchFixture = new MatchFixture(req.body);
    await matchFixture.save();
    res.status(201).json(matchFixture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read - Barcha match fixtureni olish
export const getMatchFixtures = async (req, res) => {
  try {
    const matchFixtures = await MatchFixture.find()
      .populate("home_team_id")
      .populate("away_team_id")
      .populate("tournament_id");
    res.status(200).json(matchFixtures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Bitta match fixtureni olish
export const getMatchFixtureById = async (req, res) => {
  try {
    const matchFixture = await MatchFixture.findOne({ match_id: req.params.id })
      .populate("home_team_id")
      .populate("away_team_id")
      .populate("tournament_id");
    if (!matchFixture)
      return res.status(404).json({ message: "Match topilmadi" });
    res.status(200).json(matchFixture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Match fixtureni yangilash
export const updateMatchFixture = async (req, res) => {
  try {
    const matchFixture = await MatchFixture.findOneAndUpdate(
      { match_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!matchFixture)
      return res.status(404).json({ message: "Match topilmadi" });
    res.status(200).json(matchFixture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - Match fixtureni o'chirish
export const deleteMatchFixture = async (req, res) => {
  try {
    const matchFixture = await MatchFixture.findOneAndDelete({
      match_id: req.params.id,
    });
    if (!matchFixture)
      return res.status(404).json({ message: "Match topilmadi" });
    res.status(200).json({ message: "Match o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
