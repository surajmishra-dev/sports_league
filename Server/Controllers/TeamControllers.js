import { validationResult } from "express-validator";
import TeamModel from "../Models/TeamModel.js";
import PlayerModel from "../Models/PlayerModel.js";

// PARAM CONTROLLER
export const getTeamById = (req, res, next, id) => {
  TeamModel.findById(id).exec((err, team) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    } else if (!team) {
      res.status(400).json({
        error: "TEAM NOT FOUND IN DATABASE",
      });
    } else if (team) {
      req.team = team;
      next();
    }
  });
};

// POST ROUTE FOR ADDING A TEAM

export const createTeam = (req, res) => {
  const { teamName, listOfTeamPlayers } = req.body;

  const teamDetails = {
    teamName: teamName,
    listOfTeamPlayers: listOfTeamPlayers,
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const newTeam = new TeamModel(teamDetails);
  newTeam.save((err, team) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    } else if (!team) {
      res.status(400).json({
        error: "TEAM CREATION FAILED",
      });
    } else if (team) {
      res.status(201).json({
        success: "TEAM CREATED SUCCESSFULLY",
      });
    }
  });
};

// GET SINGLE TEAM

export const getSingleTeam = (req, res) => {
  res.status(200).json({
    team: req.team,
  });
};

// GET ALL TEAMS

export const getAllTeams = (req, res) => {
  TeamModel.find()
    .sort({ _id: -1 })
    .exec((err, teams) => {
      if (err) {
        res.status(500).json({
          error: JSON.stringify(err),
        });
      } else if (teams.length < 1) {
        res.status(400).json({
          error: "NO TEAMS FOUND IN DB ! REFRESH THE PAGE IF REQUIRED",
        });
      } else if (teams.length > 0) {
        res.status(200).json(teams);
      }
    });
};

// DELETE team

export const deleteTeam = (req, res) => {
  PlayerModel.deleteMany({ teamId: req.team._id }).exec((err, players) => {
    console.log("");
  });

  TeamModel.deleteOne(req.team).exec((err, deletedTeam) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    } else if (!deletedTeam) {
      res.status(400).json({
        error: `Deletion of ${req.team.teamName} Failed`,
      });
    } else if (deletedTeam) {
      res.status(200).json({
        success: `${req.team.teamName} Deleted Successfully`,
      });
    }
  });
};

// UPDATE LIST OF PLAYERS IN TEAM

export const updateTeam = (req, res) => {
  const { playerId, playerName } = req.body;

  TeamModel.findOne(req.team).exec((err, teamFound) => {
    if (teamFound) {
      // COPY THE PREVIOUS LIST OF PLAYERS
      var oldListOfPlayers = [...teamFound.listOfTeamPlayers];

      // PUSH NEW PLAYER
      oldListOfPlayers.push({ playerId, playerName });

      // UPDATE WITH NEW LIST OF PLAYERS
      TeamModel.updateOne(req.team, {
        $set: { listOfTeamPlayers: oldListOfPlayers },
      }).exec((err, updatedTeam) => {
        if (err) {
          res.status(500).json({
            error: JSON.stringify(err),
          });
        } else if (!updatedTeam) {
          res.status(400).json({
            error: "FAILED TO UPDATED THE TEAM",
          });
        } else if (updatedTeam) {
          res.status(201).json({
            success: "TEAM UPDATED SUCCESSFULLY",
          });
        }
      });
    }
  });
};

// DELETE PLAYER FROM THE TEAM SEPRATELY

export const deletePlayerFromTeam = (req, res) => {
  const { playerId } = req.body;

  TeamModel.findOne(req.team).exec((err, team) => {
    if (err) {
      return res.status(400).json({
        error: JSON.stringify(err),
      });
    } else if (team) {
      const getOlderArrayOfPlayers = [...team.listOfTeamPlayers];

      // CREATE AN COPY OF ARRAY BY REMOVING THE PLAYER AND NEW ARRAY LIST WILL BE UPDATED IN DB

      const result = getOlderArrayOfPlayers.filter((player, err) => {
        return player.playerId !== playerId;
      });

      // UPDATE HERE NEW PLAYER LIST
      TeamModel.updateOne(req.team, {
        $set: { listOfTeamPlayers: result },
      }).exec((err, updatedTeam) => {
        if (err) {
          res.status(500).json({
            error: JSON.stringify(err),
          });
        } else if (!updatedTeam) {
          res.status(400).json({
            error: "FAILED TO UPDATED THE TEAM",
          });
        } else if (updatedTeam) {
          res.status(201).json({
            success: "TEAM UPDATED SUCCESSFULLY",
          });
        }
      });
    }
  });
};
