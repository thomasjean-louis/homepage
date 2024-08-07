import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// import GameStackProvider, {
//   GameStackContext,
// } from "./components/GameStacks/GameStacksContext";

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
// import { GameStackContext } from "./components/GameStacks/GameStackContext";
import UpdateGameStacks from "./components/GameStacks/UpdateGameStack";
import { GameStackContext } from "./components/GameStacks/GameStackContext";
import JoinGameStacks from "./components/GameStacks/JoinGameStack";

// function TestModif() {
//   // const navigate = useNavigate();
//   const { gameStack, setGameStack } = useContext(GameStackContext);
//   // setGameStacks(_gameStack);
//   // _id: string,
//   // _capacity: number,
//   // _serverLink: string

//   useEffect(() => {
//     setGameStack({
//       id: "id_temp",
//       capacity: 43,
//       game_server_https_url: "qsdjqj.com",
//     });
//   });

//   return (
//     <>
//       <p>some other component</p>
//     </>
//   );
// console.log("link : " + gamestack["gameserver_https_url"]);
// setGameStackState(gamestack);
// navigate("/gamestacks/update");
// }

// function TestLire() {
//   const { gameStack } = useContext(GameStackContext);

//   return (
//     <div>
//       Update <p>id: {gameStack.id}</p>
//       <p>capacity: {gameStack.capacity}</p>
//       <p>game_server_https_url: {gameStack.game_server_https_url}</p>
//     </div>
//   );
// }

export interface GameStack {
  id: string;
  capacity: number;
  game_server_https_url: string;
}

function App() {
  // const [gameStackState, setGameStackState] = useState(undefined);

  const [gameStack] = useState<GameStack>({
    id: "defaultId",
    capacity: -1,
    game_server_https_url: "defaultUrl",
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GameStackContext.Provider value={gameStack}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/gamestacks" element={<ListGameStacks />} />
              <Route path="/gamestacks/add" element={<AddGameStacks />} />
              <Route path="/gamestacks/update" element={<UpdateGameStacks />} />
              <Route path="/gamestack/join" element={<JoinGameStacks />} />
            </Routes>
          </Router>
        </GameStackContext.Provider>
      </ThemeProvider>
      {/* <GameServer /> */}

      {/* <Button onClick={() => console.log("Clicked")}>Create server</Button> */}
    </div>
  );
}

export default App;
