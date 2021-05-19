import { API } from "../API.js";

// ADD NEW TEAM
export const addTeam = (team) => {
  return fetch(`${API}/createteam`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// GET SINGLE TEAM BY ID
export const getSingleTeam = (teamId) => {
  return fetch(`${API}/team/${teamId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// GET ALL TEAMS
export const getAllTeams = () => {
  return fetch(`${API}/allteams`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// DELETE TEAM
export const deleteTeam = (teamId) => {
  return fetch(`${API}/deleteteam/${teamId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// UPDATE TEAM

export const updateTeam = (teamId, newDetailsAboutPlayers) => {
  return fetch(`${API}/updateteam/${teamId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDetailsAboutPlayers),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// DELETE PARTICULAR PLAYER FROM TEAM

export const deletePlayerFromTeam = (teamId, playerId) => {
  return fetch(`${API}/deleteplayer/${teamId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerId),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
