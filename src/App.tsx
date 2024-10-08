import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchUserAttributes } from "@aws-amplify/auth";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";

// let token = (await fetchAuthSession()).tokens?.idToken?.toString();

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Default theme
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

import Home from "./components/Home/Home";
import ListGameStacks from "./components/GameStacks/ListGameStacks";
import AddGameStacks from "./components/GameStacks/CreateGameStack";
import UpdateGameStacks from "./components/GameStacks/UpdateGameStack";
import { GameStackContext } from "./components/GameStacks/GameStackContext";
import JoinGameStacks from "./components/GameStacks/JoinGameStack";
import { SessionContext } from "./components/GameStacks/SessionContext";
import { Hub } from "aws-amplify/utils";

export interface GameStack {
  id: string;
  capacity: number;
  game_server_https_url: string;
}

export interface Session {
  role: string;
  token: string;
}

function App() {
  const [gameStack] = useState<GameStack>({
    id: "defaultId",
    capacity: -1,
    game_server_https_url: "defaultUrl",
  });

  const [session, setSession] = useState<Session>({
    role: "defaultRole",
    token: "defaultToken",
  });

  const components = {
    SignIn: {
      Footer() {
        return <div></div>;
      },
    },
  };

  const styles = {
    display: "flex",
    alignItems: "right",
    justifyContent: "center",
  };

  function updateSessionContext(_role: string, _token: string) {
    setSession({
      ...session,
      role: _role,
      token: _token,
    });
  }

  const SetUserAttributes = async () => {
    try {
      const { tokens } = await fetchAuthSession();

      if (tokens !== undefined) {
        updateSessionContext(
          "" + tokens.accessToken.payload["cognito:groups"],
          tokens.accessToken.toString()
        );
      }
    } catch (e) {}
  };

  useEffect(() => {
    SetUserAttributes();
  }, []);

  return (
    <div className="App">
      <div>
        <Authenticator components={components} hideSignUp>
          {({ signOut, user }) => (
            <ThemeProvider theme={theme}>
              <SessionContext.Provider value={session}>
                <GameStackContext.Provider value={gameStack}>
                  <CssBaseline />
                  <Grid container marginTop={2}>
                    <Grid sx={styles} item xs={12}>
                      <Typography variant="h5" color="inherit">
                        {user?.username}&nbsp;{"-"}&nbsp;{session.role}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid sx={styles} item xs={12}>
                      <Typography variant="h6" color="inherit">
                        <Button variant="text" onClick={signOut} color="error">
                          Sign out
                        </Button>
                        <Divider
                          sx={{
                            backgroundColor: "white",
                            height: "2px",
                            width: "100%",
                          }}
                        />
                      </Typography>
                    </Grid>
                  </Grid>

                  <Router>
                    <Routes>
                      <Route path="/" element={<ListGameStacks />} />
                      {
                        <Route
                          path="/index.html"
                          element={<Navigate replace to="/" />}
                        />
                      }

                      {/* <Route path="/gamestacks" element={<ListGameStacks />} /> */}
                      <Route
                        path="/gamestacks/add"
                        element={<AddGameStacks />}
                      />
                      <Route
                        path="/gamestacks/update"
                        element={<UpdateGameStacks />}
                      />
                      <Route
                        path="/gamestack/join"
                        element={<JoinGameStacks />}
                      />
                    </Routes>
                  </Router>
                </GameStackContext.Provider>
              </SessionContext.Provider>
            </ThemeProvider>
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;
