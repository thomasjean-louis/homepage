import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_X9GPdaxDY",
      userPoolClientId: "2bemimoavopb12npuacjg2fl4",
      identityPoolId: "us-east-1:80576997-dd36-4acc-a0b4-3750268befb2",
      userPoolEndpoint: "https://auth.891377196548.realhandsonlabs.net",
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
