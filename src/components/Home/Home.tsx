import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link component={RouterLink} variant="body1" to="/gamestacks">
        GameStacks
      </Link>
    </div>
  );
}

export default Home;
