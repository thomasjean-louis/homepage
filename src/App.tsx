import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchUserAttributes } from "@aws-amplify/auth";

// let token = (await fetchAuthSession()).tokens?.idToken?.toString();

import {
  BrowserRouter as Router,
  Routes,
  Route,
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
}

function App() {
  const [gameStack] = useState<GameStack>({
    id: "defaultId",
    capacity: -1,
    game_server_https_url: "defaultUrl",
  });

  const [session, setSession] = useState<Session>({
    role: "defaultRole",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          navigate("/", {});
          break;
        case "signInWithRedirect_failure":
          console.log("error during Oauth flow");
          break;
        case "customOAuthState":
          console.log("customOAuthState");

          break;
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <div>
        {true &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1") ? (
          <ThemeProvider theme={theme}>
            <SessionContext.Provider value={session}>
              <GameStackContext.Provider value={gameStack}>
                <CssBaseline />

                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/gamestacks" element={<ListGameStacks />} />
                    <Route path="/gamestacks/add" element={<AddGameStacks />} />
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
        ) : (
          <Authenticator
            // socialProviders={["apple", "facebook", "google"]}
            hideSignUp
          >
            {({ signOut, user }) => (
              <ThemeProvider theme={theme}>
                <SessionContext.Provider value={session}>
                  <GameStackContext.Provider value={gameStack}>
                    <CssBaseline />

                    <Router>
                      <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                          path="/gamestacks"
                          element={<ListGameStacks />}
                        />
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
                    <button onClick={signOut}>Sign out</button>
                    {/* <button onClick={printUserAttributes}>
                      Print Attributes
                    </button> */}
                  </GameStackContext.Provider>
                </SessionContext.Provider>
              </ThemeProvider>
            )}
          </Authenticator>
        )}
      </div>
    </div>
  );
}

export default App;
