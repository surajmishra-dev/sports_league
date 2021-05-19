import express from "express";
import { check } from "express-validator";
import {
  getTeamById,
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
  deletePlayerFromTeam,
} from "../Controllers/TeamControllers.js";
const teamRouter = express.Router();

// PARAMS
teamRouter.param("teamId", getTeamById);

// ROUTES
teamRouter.post(
  "/createteam",
  [check("teamName").isLength({ min: 1 }).withMessage("Team name is required")],
  createTeam
);
teamRouter.get("/team/:teamId", getSingleTeam);
teamRouter.get("/allteams", getAllTeams);
teamRouter.put("/updateteam/:teamId", updateTeam);
teamRouter.delete("/deleteteam/:teamId", deleteTeam);
teamRouter.put("/deleteplayer/:teamId", deletePlayerFromTeam);

export default teamRouter;
