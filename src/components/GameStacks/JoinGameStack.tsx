import { Helmet } from "react-helmet";
import { useGameStackContext } from "./GameStackContext";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSessionContext } from "./SessionContext";

function JoinGameStacks() {
  const gameStack = useGameStackContext();
  const user = useSessionContext();

  useEffect(() => {
    const handler = () => {};

    if (document.readyState === "complete") {
      handler();
    } else {
      window.addEventListener("load", handler);
      return () => {
        document.removeEventListener("load", handler);
      };
    }
  });

  let navigate = useNavigate();
  if (gameStack.game_server_https_url == "defaultUrl") {
    console.log("redirect");
    return () => {
      navigate("/index.html");
    };
  }

  return (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <link rel="manifest" href="/manifest.json" />
      {
        <Grid container marginTop={2}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
            item
            xs={12}
          >
            <Helmet>
              <script
                type="text/javascript"
                src="/ioquake3.js"
                data-url={gameStack.game_server_https_url}
                player-name={user.username}
              ></script>
            </Helmet>
            <div>
              <div id="viewport-frame"></div>
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default JoinGameStacks;
