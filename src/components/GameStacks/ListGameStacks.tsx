import { SetStateAction, useContext, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";

import RefreshIcon from "@mui/icons-material/Refresh";
import CircleIcon from "@mui/icons-material/Circle";
import { green } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { GameStack } from "../../App";
import { useGameStackContext } from "./GameStackContext";

function ListGameStacks() {
  const navigate = useNavigate();

  const [gamestacks, setGameStacks] = useState([]);

  var apiHttpsUrl = "default";

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    apiHttpsUrl = "https://" + "api.d.thomasjeanlouis.com";
  } else {
    apiHttpsUrl = "https://" + import.meta.env.VITE_API_HTTPS_URL;
  }

  const getGameStacksEndpoint = apiHttpsUrl + "/gamestacks";
  const createGameStackEndpoint = apiHttpsUrl + "/gamestack";
  const deleteGameStackEndpoint = apiHttpsUrl + "/gamestack";
  const startGameServerEndpoint = apiHttpsUrl + "/startgameserver";
  const stopGameServerEndpoint = apiHttpsUrl + "/stopgameserver";

  const gameStack = useGameStackContext();

  function updateGameStackContext(
    _id: string,
    _capacity: number,
    _serverLink: string
  ) {
    gameStack.id = _id;
    gameStack.capacity = _capacity;
    gameStack.game_server_https_url = _serverLink;
  }

  function updateGameStack(
    _id: string,
    _capacity: number,
    _serverLink: string
  ) {
    updateGameStackContext(_id, _capacity, _serverLink);
    navigate("/gamestacks/update", {});
  }

  async function fetchGameStacks() {
    try {
      axios
        .get(getGameStacksEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          setGameStacks(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function refreshGameStacks() {
    fetchGameStacks();
  }

  function addGameStack() {
    navigate("/gamestacks/add");
  }

  function deleteGameStack(_id: string) {
    try {
      axios.delete(deleteGameStackEndpoint + "/" + _id).then((res) => {
        console.log(res.data);
        refreshGameStacks();
      });
    } catch (error) {
      console.error(error);
    }
  }

  function startGameServer(_id: string) {
    try {
      axios.post(startGameServerEndpoint + "/" + _id).then((res) => {
        console.log(res.data);
        refreshGameStacks();
      });
    } catch (error) {
      console.error(error);
    }
  }

  function stopGameServer(_id: string) {
    try {
      axios.post(stopGameServerEndpoint + "/" + _id).then((res) => {
        console.log(res.data);
        refreshGameStacks();
      });
    } catch (error) {
      console.error(error);
    }
  }

  function setStatusColor(_status: string) {
    var color = "";

    if (_status == "running") {
      color = green[500];
    } else if (_status == "pending") {
      color = orange[500];
    } else {
      color = red[500];
    }

    return color;
  }

  async function createGameStack() {
    try {
      axios
        .post(createGameStackEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          refreshGameStacks();
        });
    } catch (error) {
      console.error(error);
    }
  }

  function joinGameStack(_id: string, _capacity: number, _serverLink: string) {
    updateGameStackContext(_id, _capacity, _serverLink);
    navigate("/gamestack/join", {});
  }

  useEffect(() => {
    fetchGameStacks();
  }, []);

  return (
    <div>
      <Box sx={{ textAlign: "right", padding: "20px" }}>
        <IconButton
          color="secondary"
          onClick={() => {
            refreshGameStacks();
          }}
        >
          <RefreshIcon></RefreshIcon>
        </IconButton>
        <Button
          variant="contained"
          onClick={() => {
            createGameStack();
          }}
        >
          Create
        </Button>
      </Box>
      {gamestacks?.length > 0 ? (
        <div>
          {gamestacks.map((gamestack) => (
            <Box
              key={gamestack[0]["ID"]}
              sx={{
                paddingLeft: "1em",
                paddingRight: "1em",
                paddingBottom: "1em",
              }}
            >
              <Card sx={{ border: "1px solid gray" }}>
                <CardContent>
                  <Typography>
                    <IconButton
                      sx={{
                        color: setStatusColor(gamestack[0]["ServerStatus"]),
                      }}
                    >
                      <CircleIcon></CircleIcon>
                    </IconButton>
                    {gamestack[0]["ServerLink"]}
                  </Typography>
                </CardContent>
                <CardActions>
                  {gamestack[0]["ServerStatus"] === "running" ? (
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          joinGameStack(
                            gamestack[0]["ID"],
                            Number(gamestack[0]["Capacity"]),
                            gamestack[0]["ServerLink"]
                          );
                        }}
                      >
                        {" "}
                        Join{" "}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          stopGameServer(gamestack[0]["ID"]);
                        }}
                      >
                        {" "}
                        Stop{" "}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          startGameServer(gamestack[0]["ID"]);
                        }}
                      >
                        {" "}
                        Start{" "}
                      </Button>
                    </div>
                  )}
                  {/* <Button
                    size="small"
                    onClick={() => {
                      updateGameStack(
                        gamestack[0]["ID"],
                        Number(gamestack[0]["Capacity"]),
                        gamestack[0]["ServerLink"]
                      );
                    }}
                  >
                    {" "}
                    Update{" "}
                  </Button> */}
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      deleteGameStack(gamestack[0]["ID"]);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </div>
      ) : (
        <div>No game stacks have been found</div>
      )}
    </div>
  );
}

export default ListGameStacks;
