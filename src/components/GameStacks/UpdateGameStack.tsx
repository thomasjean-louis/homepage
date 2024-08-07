import { useGameStackContext } from "./GameStackContext";

function UpdateGameStack() {
  const gameStack = useGameStackContext();

  return (
    <>
      <h1> ID: {gameStack.id} </h1>
      <h1> Capacity: {gameStack.capacity} </h1>
      <h1> Server adresse: {gameStack.game_server_https_url} </h1>
    </>
  );
}

export default UpdateGameStack;
