# Homepage
React front-end repo used by the "Serverless multi-player game" demo project. The web app is hosted using the aws serverless Amplify service, and updated at each commits. 

## Presentation

### Authentication
The Amplify **Authenticator** built-in component is used to authenticate Cognito users.

### Pages
* Homepage - List of built game servers. **Classic** users can start and join games. **Admin** users can, in addition, create/stop/delete game servers.
* Game - Embedded Quake3 game window. After a countdown, the game server stops and the user is redirected to the homepage. 
