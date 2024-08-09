import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchAuthSession } from "aws-amplify/auth";

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

export interface GameStack {
  id: string;
  capacity: number;
  game_server_https_url: string;
}

function App() {
  const [gameStack] = useState<GameStack>({
    id: "defaultId",
    capacity: -1,
    game_server_https_url: "defaultUrl",
  });

  return (
    <div className="App">
      <Authenticator
      // socialProviders={["apple", "facebook", "google"]}
      // hideSignUp
      >
        {({ signOut, user }) => (
          <ThemeProvider theme={theme}>
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
                  <Route path="/gamestack/join" element={<JoinGameStacks />} />
                </Routes>
              </Router>
              {/* <p>Your token is: {token}</p> */}
              <button onClick={signOut}>Sign out</button>
            </GameStackContext.Provider>
          </ThemeProvider>
        )}
      </Authenticator>
    </div>
  );
}

export default App;
