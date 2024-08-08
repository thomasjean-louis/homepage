import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_L0nL5f1Ec",
      userPoolClientId: "3lphbb3kc3u9e06j5j1pc9m5q3",
      identityPoolId: "us-east-1:2d320387-30c6-4c7c-a114-af1599be62d0",
      userPoolEndpoint: "https://auth.654654598396.realhandsonlabs.net",
      loginWith: {
        username: true,
      },

      signUpVerificationMethod: "code",
      allowGuestAccess: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
