import express from "express";
import { connectDB } from "./db/index.js";
import { config } from "./config/index.js";
import footballClubRoutes from "./routes/footballClubs.js";
import tournamentRoutes from "./routes/tournaments.js";
import tournamentGroupRoutes from "./routes/tournamentGroups.js";

const app = express();

// Middleware
app.use(express.json());

// MongoDB ulanishi
connectDB();

// Routerlarni ulash
app.use("/api/football-clubs", footballClubRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/tournament-groups", tournamentGroupRoutes);

// Serverni ishga tushirish
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlamoqda`);
});
