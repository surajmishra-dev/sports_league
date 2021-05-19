import { API } from "../API.js";

// ADD NEW PLAYER
export const addPlayer = (player) => {
  return fetch(`${API}/createplayer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// GET SINGLE PLAYER BY ID
export const getSinglePlayer = (playerId) => {
  return fetch(`${API}/player/${playerId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// GET ALL PLAYERS
export const getAllPlayers = () => {
  return fetch(`${API}/allplayers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// DELETE PLAYER
export const deletePlayer = (playerId) => {
  return fetch(`${API}/deleteplayer/${playerId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
