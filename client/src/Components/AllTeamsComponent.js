import React, { useState, useEffect } from "react";
import TeamComponent from "./TeamComponent";
import { AppBar, Button, Toolbar, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "../CSS/AllTeams.css";
import { Link } from "react-router-dom";
import { addTeam, getAllTeams } from "../Helpers/TeamHelper";

function AllTeamsComponent() {
  //  ALL REQUIRED STATES
  const [showAddTeamForm, setshowAddTeamForm] = useState("none");

  const [teamNameState, setteamNameState] = useState({
    teamName: "",
  });

  const { teamName } = teamNameState;

  const [usermsg, setusermsg] = useState({
    msg: "",
    error: false,
    success: false,
  });

  const [allTeamsState, setallTeamsState] = useState([]);

  const [forceReload, setforceReload] = useState(false);

  // PRELOADING DATA USING USE EFFECT

  useEffect(() => {
    getAllTeams().then((data) => {
      if (data.error) {
        setusermsg({
          ...usermsg,
          msg: data.error,
          error: true,
          success: false,
        });
      } else if (!data.error) {
        setallTeamsState(data);
      }
    });
  }, [forceReload]);

  // ALL EVENT HANDLERS

  const performForceReload = () => {
    if (forceReload) {
      setforceReload(false);
    } else if (!forceReload) {
      setforceReload(true);
    }
  };

  const handleSubmitTeam = (event) => {
    performForceReload();
    if (teamName) {
      // AUTO HIDE ERROR SUCCESS MESSAGE AFTER 1 SECOND
      setTimeout(() => {
        setusermsg({ ...usermsg, msg: "" });
      }, 1000);

      // PREVENT DEFAULT ACTION

      // ADD TEAM API CALL
      event.preventDefault();
      addTeam(teamNameState).then((data) => {
        if (data.error) {
          setusermsg({
            ...usermsg,
            msg: data.error,
            error: true,
            success: false,
          });
        } else if (data.success) {
          setusermsg({
            ...usermsg,
            msg: data.success,
            success: true,
            error: false,
          });
        }
      });
    }
  };

  return (
    <>
      {/* NAV BAR  */}
      {usermsg.msg ? (
        <div
          className="msg"
          onClick={() => {
            setusermsg({ ...usermsg, msg: "" });
          }}
        >
          <p>{usermsg.msg}</p>
          <Close />
        </div>
      ) : (
        ""
      )}

      <AppBar position="sticky">
        <div className="nav_container">
          <div className="sub_nav_container">
            <h1>Teams</h1>
            <Link className="link" to="/players">
              View Players
            </Link>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setshowAddTeamForm("block");
            }}
          >
            Add New Team
          </Button>
        </div>
      </AppBar>

      {/* ADD NEW TEAM FORM */}
      <div
        className="dark_cover_main_container"
        style={{ display: showAddTeamForm }}
      >
        <div
          className="dark_cover"
          onClick={() => {
            setshowAddTeamForm("none");
          }}
        ></div>
        <form className="form_container">
          <h1>Add New Team</h1>
          <div className="sub_form_container">
            <TextField
              label="Team Name"
              variant="outlined"
              required={true}
              onChange={(event) => {
                setteamNameState({
                  ...teamNameState,
                  teamName: event.target.value,
                });
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmitTeam}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      {/* RENDER ALL THE TEAMS */}

      <div className="row">
        <div className="column">
          {allTeamsState.map((team, index) => {
            if (index % 2 == 0) {
              return (
                <TeamComponent
                  key={index}
                  teamId={team._id}
                  teamName={team.teamName}
                  listOfPlayers={team.listOfTeamPlayers}
                  setforceReload={setforceReload}
                  forceReload={forceReload}
                />
              );
            }
          })}
        </div>
        <div className="column">
          {allTeamsState.map((team, index) => {
            if (index % 2 == 1) {
              return (
                <TeamComponent
                  key={index}
                  teamId={team._id}
                  teamName={team.teamName}
                  listOfPlayers={team.listOfTeamPlayers}
                  setforceReload={setforceReload}
                  forceReload={forceReload}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default AllTeamsComponent;
