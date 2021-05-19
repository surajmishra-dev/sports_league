import React, { useEffect, useState } from "react";
import { AppBar, IconButton, TextField, Toolbar } from "@material-ui/core";
import "../CSS/AllPlayers.css";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import "../CSS/AllPlayers.css";
import PlayerComponent from "./PlayerComponent";
import { getAllPlayers } from "../Helpers/PlayerHelper";

function AllPlayersComponent() {
  // ALL REQUIRED STATES

  const [AllPlayers, setAllPlayers] = useState([]);

  const [allPlayersByFilter, setallPlayersByFilter] = useState([]);

  const [searchingValue, setsearchingValue] = useState("");

  // PRELOADING THE DATA

  useEffect(() => {
    getAllPlayers().then((data) => {
      if (!data.error) {
        setAllPlayers(data);
      }
    });
  }, []);

  // ALL REQURIED EVENT HANDLERS

  const handleChangeInSearch = (event) => {
    setsearchingValue(event.target.value);
  };

  return (
    <>
      <AppBar position="sticky">
        <div className="nav_container">
          <div className="sub_nav_container">
            <h1>Players</h1>
            <Link className="link" to="/">
              View Teams
            </Link>
          </div>

          <div className="search_container">
            <Search
              style={{
                color: "white",
                backgroundColor: "#3f51b5",
                borderRadius: "50px",
                padding: "10px",
                borderWidth: "0px",
              }}
            />
            <input
              placeholder="Search Player..."
              type="search"
              onChange={handleChangeInSearch}
            />
          </div>
        </div>
      </AppBar>
      {searchingValue == "" ? (
        <div className="row">
          <div className="column">
            {AllPlayers.map((player, index) => {
              if (index % 2 == 0) {
                return (
                  <PlayerComponent
                    key={index}
                    playerName={player.playerName}
                    teamName={player.teamName}
                  />
                );
              }
            })}
          </div>
          <div className="column">
            {AllPlayers.map((player, index) => {
              if (index % 2 == 1) {
                return (
                  <PlayerComponent
                    key={index}
                    playerName={player.playerName}
                    teamName={player.teamName}
                  />
                );
              }
            })}
          </div>
        </div>
      ) : (
        AllPlayers.map((player, index) => {
          if (
            player.playerName.slice(0, searchingValue.length).toLowerCase() ==
            searchingValue.toLowerCase()
          ) {
            return (
              <PlayerComponent
                key={index}
                playerName={player.playerName}
                teamName={player.teamName}
              />
            );
          }
        })
      )}
    </>
  );
}

export default AllPlayersComponent;
