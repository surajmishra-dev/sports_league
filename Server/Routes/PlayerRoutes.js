import express from "express";
const playerRouter = express.Router();
import {
  getPlayerById,
  createPlayer,
  getSinglePlayer,
  getAllPlayers,
  deletePlayer,
} from "../Controllers/PlayerControllers.js";
import { check } from "express-validator";

// PARAMS
playerRouter.param("playerId", getPlayerById);

// ROUTES
playerRouter.post(
  "/createplayer",
  [
    check("playerName")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 char long"),
    check("teamName").isLength({ min: 1 }).withMessage("Team name is required"),
  ],
  createPlayer
);
playerRouter.get("/player/:playerId", getSinglePlayer);
playerRouter.get("/allplayers", getAllPlayers);
playerRouter.delete("/deleteplayer/:playerId", deletePlayer);

export default playerRouter;
