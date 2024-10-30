import {
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useRef,
  RefObject,
} from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
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

import { fetchAuthSession } from "aws-amplify/auth";
import { useSessionContext } from "./SessionContext";

import { makeStyles, createStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  refresh: {
    marginTop: "20px",
    cursor: "pointer",
    margin: "auto",
    "&.spin": {
      animation: "$spin 1s 1",
      pointerEvents: "none",
    },
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

function ListGameStacks() {
  const navigate = useNavigate();

  const [gamestacks, setGameStacks] = useState([]);
  const session = useSessionContext();

  var isAdmin = session.role == "admin";

  var apiHttpsUrl = "default";

  apiHttpsUrl = "https://" + import.meta.env.VITE_API_HTTPS_URL;

  const getGameStacksEndpoint = apiHttpsUrl + "/gamestacks";
  const createGameStackEndpoint = apiHttpsUrl + "/gamestack";
  const deleteGameStackEndpoint = apiHttpsUrl + "/gamestack";
  const startGameServerEndpoint = apiHttpsUrl + "/startgameserver";
  const stopGameServerEndpoint = apiHttpsUrl + "/stopgameserver";

  const gameStack = useGameStackContext();

  function updateGameStackContext(
    _id: string,
    _capacity: number,
    _serverLink: string,
    _serverStopTime: string
  ) {
    gameStack.id = _id;
    gameStack.capacity = _capacity;
    gameStack.game_server_https_url = _serverLink;
    gameStack.server_stop_time = _serverStopTime;
  }

  function updateGameStack(
    _id: string,
    _capacity: number,
    _serverLink: string,
    _serverStopTime: string
  ) {
    updateGameStackContext(_id, _capacity, _serverLink, _serverStopTime);
    navigate("/gamestacks/update", {});
  }

  async function fetchGameStacks() {
    refreshCanvas();
    try {
      axios
        .get(getGameStacksEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: session.token,
          },
        })
        .then((res) => {
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
      axios
        .delete(deleteGameStackEndpoint + "/" + _id, {
          headers: {
            Authorization: session.token,
          },
        })
        .then((res) => {
          refreshGameStacks();
        });
    } catch (error) {
      console.error(error);
    }
  }

  function startGameServer(_id: string) {
    if (document != null && document.getElementById("start-" + _id) != null) {
      (document.getElementById("start-" + _id)! as any).disabled = "true";
    }

    try {
      axios
        .post(startGameServerEndpoint + "/" + _id, null, {
          headers: {
            Authorization: session.token,
          },
        })
        .then((res) => {
          refreshGameStacks();
        });
    } catch (error) {
      console.error(error);
    }
  }

  function stopGameServer(_id: string) {
    if (document != null && document.getElementById("stop-" + _id) != null) {
      (document.getElementById("stop-" + _id)! as any).disabled = "true";
    }

    try {
      axios
        .post(stopGameServerEndpoint + "/" + _id, null, {
          headers: {
            Authorization: session.token,
          },
        })
        .then((res) => {
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
        .post(createGameStackEndpoint, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: session.token,
          },
        })
        .then((res) => {
          refreshGameStacks();
        });
    } catch (error) {
      console.error(error);
    }
  }

  function joinGameStack(
    _id: string,
    _capacity: number,
    _serverLink: string,
    _serverStopTime: string
  ) {
    updateGameStackContext(_id, _capacity, _serverLink, _serverStopTime);
    navigate("/gamestack/join", {});
  }

  function test() {}

  function SetTimerInterval() {}

  // function GetServerTimeRemaining(_gamestack: GameStack,_datetime: string) {
  function GetServerTimeRemaining(_status: string, _datetime: string) {
    if (_status != "running") {
      return "";
    }

    var endDateTime = new Date(_datetime + "Z");

    let result =
      "Server will be stopped at " +
      endDateTime.toLocaleString() +
      " (" +
      Intl.DateTimeFormat().resolvedOptions().timeZone +
      ")";

    return result;
  }

  // const session = useSessionContext();

  function updateSessionContext(_role: string, _token: string) {
    session.role = _role;
    session.token = _token;
  }

  const SetUserAttributes = async () => {
    try {
      const { tokens } = await fetchAuthSession();
      if (tokens !== undefined) {
        updateSessionContext(
          "" + tokens.accessToken.payload["cognito:groups"],
          tokens.accessToken.toString()
        );
        fetchGameStacks();
      } else {
      }
    } catch (e) {}
  };

  const [spin, setSpin] = useState(false);
  const classes = useStyles();

  const refreshCanvas = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  };

  useEffect(() => {
    SetUserAttributes();
    if (import.meta.env.VITE_DEPLOYMENT_BRANCH == "prod") {
      const intervalCall = setInterval(() => {
        fetchGameStacks();
      }, 5000);
      return () => {
        // clean up
        clearInterval(intervalCall);
      };
    } else {
    }
  }, []);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <Grid container>
        <Grid sx={styles} item xs={12}>
          {gamestacks?.length > 0 ? (
            <div>
              <Box
                sx={{
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  paddingTop: "1em",
                  paddingBottom: "0.5em",
                }}
              >
                <Button
                  variant="contained"
                  disabled={!isAdmin}
                  onClick={() => {
                    createGameStack();
                  }}
                >
                  Create
                </Button>
                <IconButton
                  color="secondary"
                  className={clsx({
                    [classes.refresh]: true,
                    spin: spin,
                  })}
                  onClick={() => {
                    refreshGameStacks();
                  }}
                >
                  <RefreshIcon></RefreshIcon>
                </IconButton>
              </Box>
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
                      <Grid container>
                        <Grid
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                          }}
                          item
                          xs={12}
                        >
                          {" "}
                          <IconButton
                            sx={{
                              color: setStatusColor(
                                gamestack[0]["ServerStatus"]
                              ),
                            }}
                          >
                            <CircleIcon></CircleIcon>
                          </IconButton>
                          {"Server name : " +
                            (gamestack[0]["ServerLink"] as string).split(
                              ".",
                              1
                            )}
                        </Grid>
                      </Grid>

                      <Card sx={{ border: "1px dashed grey", p: 3 }}>
                        {gamestack[0]["Message"]}
                        <br></br>

                        {GetServerTimeRemaining(
                          gamestack[0]["ServerStatus"],
                          gamestack[0]["StopServerTime"]
                        )}
                      </Card>

                      <Grid sx={styles} item xs={12} marginTop={2}>
                        {gamestack[0]["ServerStatus"] === "running" ? (
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                joinGameStack(
                                  gamestack[0]["ID"],
                                  Number(gamestack[0]["Capacity"]),
                                  gamestack[0]["ServerLink"],
                                  gamestack[0]["StopServerTime"]
                                );
                              }}
                            >
                              {" "}
                              Join{" "}
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                              variant="contained"
                              id={"stop-" + gamestack[0]["ID"]}
                              disabled={!isAdmin}
                              onClick={() => {
                                stopGameServer(gamestack[0]["ID"]);
                              }}
                            >
                              {" "}
                              Stop{" "}
                            </Button>
                            &nbsp;&nbsp;
                          </div>
                        ) : (
                          <div>
                            {gamestack[0]["ServerStatus"] === "stopped" ? (
                              <div>
                                <Button
                                  variant="contained"
                                  id={"start-" + gamestack[0]["ID"]}
                                  onClick={() => {
                                    startGameServer(gamestack[0]["ID"]);
                                  }}
                                >
                                  {" "}
                                  Start{" "}
                                </Button>
                                &nbsp;&nbsp;
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        )}
                        <Button
                          size="small"
                          disabled={!isAdmin}
                          color="error"
                          onClick={() => {
                            deleteGameStack(gamestack[0]["ID"]);
                          }}
                        >
                          {" "}
                          Delete{" "}
                        </Button>
                      </Grid>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Box>
              ))}
            </div>
          ) : (
            <div>No game stacks have been found</div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ListGameStacks;
