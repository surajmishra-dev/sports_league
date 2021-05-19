import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import "../CSS/Team.css";
import {
  deletePlayerFromTeam,
  deleteTeam,
  getAllTeams,
  updateTeam,
} from "../Helpers/TeamHelper";
import performForceReload from "./AllTeamsComponent";
import { Close } from "@material-ui/icons";
import { addPlayer, deletePlayer } from "../Helpers/PlayerHelper";

function TeamComponent({
  teamId,
  teamName,
  listOfPlayers = [],
  setforceReload = (f) => f,
  forceReload = undefined,
}) {
  // ALL REQUIRED STATES
  const [showAddPlayerForm, setshowAddPlayerForm] = useState(false);
  const [newPlayerDetails, setnewPlayerDetails] = useState({
    playerName: "",
  });
  const [listOfTeamPlayers, setlistOfTeamPlayers] = useState();
  const [playerDetails, setplayerDetails] = useState({
    playerId: "",
    playerName: "",
  });
  // PRELOADING DATA

  useEffect(() => {
    getAllTeams().then((data) => {
      if (!data.error) {
        const getAllTeamPlayers = [];

        data.forEach((team, index) => {
          team.listOfTeamPlayers.forEach((player, index) => {
            getAllTeamPlayers.push(player.playerName);
          });
        });
        setlistOfTeamPlayers(getAllTeamPlayers);
      }
    });
  }, []);

  // ALL REQUIRED EVENT HANDLERS

  const handleChange_AddPlayer = (event) => {
    setnewPlayerDetails({
      ...newPlayerDetails,
      playerName: event.target.value,
    });
  };

  const handleSubmit_AddPlayer = (event) => {
    if (newPlayerDetails.playerName) {
      event.preventDefault();
      addPlayer({
        playerName: newPlayerDetails.playerName,
        teamName: teamName,
        teamId: teamId,
      }).then((data) => {
        if (data.success) {
          const playerDetails = {
            playerId: data.success._id,
            playerName: data.success.playerName,
          };

          updateTeam(teamId, playerDetails).then(setforceReload(!forceReload));
        }
      });
    }
  };

  return (
    <>
      <div className="team_details_container">
        <div className="name_delete_container">
          <h2> {teamName}</h2>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              deleteTeam(teamId);
              setforceReload(!forceReload);
            }}
          >
            Remove Team
          </Button>
        </div>

        <div
          className="add_new_player_main_container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setshowAddPlayerForm(true);
            }}
          >
            Add New Player
          </Button>

          {showAddPlayerForm ? (
            <form className="input_container">
              <input
                type="text"
                onChange={handleChange_AddPlayer}
                style={{
                  padding: "9px",
                  margin: "0px 2px",
                  border: "0px",
                  borderRadius: "5px",
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit_AddPlayer}
                type="submit"
              >
                Add
              </Button>
              <div onClick={() => setshowAddPlayerForm(false)}>
                <Close />
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
        {listOfPlayers.map((player, index) => {
          return (
            <div key={index} className="player_container">
              {<p>{player.playerName}</p>}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  deletePlayer(player.playerId).then(
                    deletePlayerFromTeam(teamId, {
                      playerId: player.playerId,
                    }).then(setforceReload(!forceReload))
                  );
                }}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TeamComponent;
