import { useEffect, useState } from "react";

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

function ListGameStacks() {
  const [gamestacks, setGameStacks] = useState([]);

  const apiHttpsUrl = "https://" + import.meta.env.VITE_API_HTTPS_URL;
  // const apiHttpsUrl = "https://" + "api.905418110083.realhandsonlabs.net";

  const getGameStacksEndpoint = apiHttpsUrl + "/gamestacks";
  const createGameStackEndpoint = apiHttpsUrl + "/gamestack";

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

  useEffect(() => {
    fetchGameStacks();
  }, []);

  return (
    <div>
      <Box sx={{ textAlign: "right", padding: "20px" }}>
        <IconButton color="secondary" onClick={() => {}}>
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
                  <Typography>{gamestack[0]["ID"]}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {}}>
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
