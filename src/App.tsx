import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/gamestacks" element={<ListGameStacks />} />
            <Route path="/gamestacks/add" element={<AddGameStacks />} />
            <Route path="/gamestacks/update" element={<UpdateGameStacks />} />
          </Routes>
        </Router>
      </ThemeProvider>
      {/* <GameServer /> */}

      {/* <Button onClick={() => console.log("Clicked")}>Create server</Button> */}
    </div>
  );
}

export default App;
