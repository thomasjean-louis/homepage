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
        console.log(
          "user belongs to following groups: " +
            tokens.accessToken.payload["cognito:groups"]
        );
        updateSessionContext(
          "" + tokens.accessToken.payload["cognito:groups"],
          "" + tokens.accessToken.payload["jwtToken"]
        );
      } else {
        console.log("couldn't get cognito token");
      }

      console.log("context role : " + session.role);

      // console.log("role:", userAttributes.role);
    } catch (e) {
      console.log(e);
    }
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
