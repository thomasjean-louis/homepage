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
import { useNavigate } from "react-router-dom";
import { GameStack } from "../../App";
import { useGameStackContext } from "./GameStackContext";
// import { GameStackContext } from "./GameStackContext";
// import { GameStack, GameStackContext } from "./GameStacksContext";

// function TestModif(_id: string, _capacity: number, _serverLink: string) {
//   // const navigate = useNavigate();
//   const { gameStack, setGameStack } = useContext(GameStackContext);
//   // setGameStacks(_gameStack);
//   // _id: string,
//   // _capacity: number,
//   // _serverLink: string

//   useEffect(() => {
//     setGameStack({
//       id: "id_temkkp",
//       capacity: 44,
//       game_server_https_url: "qsdkkjqj.com",
//     });
//   });
//   return <></>;
// }

function ListGameStacks() {
  const navigate = useNavigate();

  // const { setGameStack } = useContext(GameStackContext);

  const [gamestacks, setGameStacks] = useState([]);

  // const [gameStack] = useState<GameStack>({
  //   id: "defaultId",
  //   capacity: -1,
  //   game_server_https_url: "defaultUrl",
  // });

  // const { gameStack, setGameStack } = useContext(GameStackContext);

  const apiHttpsUrl = "https://" + import.meta.env.VITE_API_HTTPS_URL;
  // const apiHttpsUrl = "https://" + "api.891377339569.realhandsonlabs.net";

  const getGameStacksEndpoint = apiHttpsUrl + "/gamestacks";
  const createGameStackEndpoint = apiHttpsUrl + "/gamestack";

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

  function deleteGameStack() {
    navigate("/gamestacks/delete");
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
          setGameStacks(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function joinGameStack(_id: string, _capacity: number, _serverLink: string) {
    updateGameStackContext(_id, _capacity, _serverLink);
    navigate("/gamestack/join", {});
  }

  // useEffect(() => {
  //   fetchGameStacks();
  // }, []);

  // const [gameStack] = useState<GameStack>({
  //   id: "eee",
  //   capacity: 4,
  //   game_server_https_url: "ezezz",
  // });

  useEffect(() => {
    fetchGameStacks();
  }, []);

  return (
    <div>
      {/* <GameStackContext.Provider value={gameStack}> */}
      {/* <TestModif _id: "truc", _capacity: 4, _serverLink: "ee"/> */}
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
            //  addGameStack();
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
                  <Typography>{gamestack[0]["ServerLink"]}</Typography>
                </CardContent>
                <CardActions>
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
                    size="small"
                    onClick={() => {
                      updateGameStack(
                        gamestack[0]["ID"],
                        Number(gamestack[0]["Capacity"]),
                        gamestack[0]["ServerLink"]
                      );

                      // gameStack.id = "test-new-sdhdhsdb";

                      // updateGameStack("truu", 5, "azeaze.com");
                      // navigate("/gamestacks/update", {});
                      // TestModif("test-id", 2, "server-link");
                      // updateGameStack();
                    }}
                  >
                    {" "}
                    Update{" "}
                  </Button>
                  <Button size="small" color="error" onClick={() => {}}>
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
