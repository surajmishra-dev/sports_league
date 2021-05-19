import { validationResult } from "express-validator";
import PlayerModel from "../Models/PlayerModel.js";

// PARAM CONTROLLER
export const getPlayerById = (req, res, next, id) => {
  PlayerModel.findById(id).exec((err, player) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    } else if (!player) {
      res.status(400).json({
        error: "PLAYER NOT FOUND IN DATABASE",
      });
    } else if (player) {
      req.player = player;
      next();
    }
  });
};

// POST ROUTE FOR ADDING A PLAYER

export const createPlayer = (req, res) => {
  const { playerName, teamName, teamId } = req.body;

  const playerDetails = {
    playerName: playerName,
    teamName: teamName,
    teamId: teamId,
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const newPlayer = new PlayerModel(playerDetails);
  newPlayer.save((err, player) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else if (!player) {
      res.status(400).json({
        error: "PLAYER CREATION FAILED",
      });
    } else if (player) {
      res.status(201).json({
        success: player,
      });
    }
  });
};

// GET SINGLE PLAYER

export const getSinglePlayer = (req, res) => {
  res.status(200).json({
    player: req.player,
  });
};

// GET ALL PLAYERS

export const getAllPlayers = (req, res) => {
  PlayerModel.find()
    .sort({ _id: -1 })
    .exec((err, players) => {
      if (err) {
        res.status(500).json({
          error: JSON.stringify(err),
        });
      } else if (players.length < 1) {
        res.status(400).json({
          error: "NO PLAYERS FOUND",
        });
      } else if (players.length > 0) {
        res.status(200).json(players);
      }
    });
};

// DELETE PLAYER

export const deletePlayer = (req, res) => {
  PlayerModel.deleteOne(req.player).exec((err, deletedPlayer) => {
    if (err) {
      res.status(500).json({
        error: JSON.stringify(err),
      });
    } else if (!deletedPlayer) {
      res.status(400).json({
        error: `Deletion of ${req.player.playerName} Failed`,
      });
    } else if (deletedPlayer) {
      res.status(200).json({
        success: `${req.player.playerName} Deleted Successfully`,
      });
    }
  });
};
