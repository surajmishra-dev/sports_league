import React from "react";
import "../CSS/Player.css";

function PlayerComponent({ playerName, teamName }) {
  return (
    <>
      <div className="player_details_container">
        <p>Player Name : {playerName}</p>
        <p>Team Name : {teamName}</p>
      </div>
    </>
  );
}

export default PlayerComponent;
