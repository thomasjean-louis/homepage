import { Helmet } from "react-helmet";
import { useGameStackContext } from "./GameStackContext";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useSessionContext } from "./SessionContext";

function JoinGameStacks() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState("true");
  const [timeRemainingText, setTimeRemainingText] = useState("");

  const gameStack = useGameStackContext();
  const user = useSessionContext();

  if (gameStack.game_server_https_url == "defaultUrl") {
    return <Navigate to="/" replace />;
  }

  function GetServerTimeRemaining() {
    var stopDate = new Date(gameStack.server_stop_time + "Z");
    var dateNow = new Date();

    const milliDiff: number = stopDate.getTime() - dateNow.getTime();
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remMinutes = totalMinutes % 60;
    const remSeconds = totalSeconds % 60;

    var countdown = "";

    if (remMinutes > 0) {
      countdown = remMinutes + " min ";
    }

    if (remSeconds > 0) {
      countdown += remSeconds + " s";
    }

    if (remMinutes <= 0 && remSeconds <= 4) {
      ForcePageRefresh();
    }

    setTimeRemainingText("Time remaining : " + countdown);
  }

  function ForcePageRefresh() {
    window.location.reload();
  }

  const [counter, setCounter] = useState(60);


  useEffect(() => {
    const handler = () => {};

    const intervalCall = setInterval(() => {
      GetServerTimeRemaining();
          }, 1000);

    if (document.readyState === "complete") {
      // handler();
    } else {
      // window.addEventListener("load", handler);
      return () => {
        clearInterval(intervalCall);
        document.removeEventListener("load", handler);
      };
    }
  });


  const styles = {
    display: "flex",
    alignItems: "right",
    justifyContent: "center",
  };

  return (
    <>
      <meta name="isPlaying" content={isPlaying} />
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
              {}
              <Grid container>
                <Grid sx={styles} item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      ForcePageRefresh();
                    }}
                  >
                    Home
                  </Button>&nbsp;&nbsp;
                  <Typography variant="h6" color="inherit">
                    {timeRemainingText}
                  </Typography>
                </Grid>
              </Grid>
              <div id="viewport-frame"></div>
            </div>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default JoinGameStacks;
