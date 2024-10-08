import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { fetchAuthSession } from "aws-amplify/auth";
import { useSessionContext } from "../GameStacks/SessionContext";

function Home() {
  const session = useSessionContext();

  function updateSessionContext(_role: string, _token: string) {
    session.role = _role;
    session.token = _token;
  }

  const SetUserAttributes = async () => {
    try {
      // const userAttributes = await fetchUserAttributes();
      const { tokens } = await fetchAuthSession();
      if (tokens !== undefined) {
        updateSessionContext(
          "" + tokens.accessToken.payload["cognito:groups"],
          tokens.accessToken.toString()
        );
      } else {
      }
    } catch (e) {}
  };

  SetUserAttributes();

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
