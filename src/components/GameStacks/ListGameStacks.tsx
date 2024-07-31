import { useEffect, useState } from "react";

import axios from "axios";

function ListGameStacks() {
  const [gamestacks, setGameStacks] = useState([]);

  // const gameStacksGetEndpoint =
  //   "https://api.339713159350.realhandsonlabs.net/gamestacks";
  const gameStacksGetEndpoint =
    "https://" + import.meta.env.VITE_API_HTTPS_URL + "/gamestacks";

  async function fetchGameStacks() {
    try {
      axios.get(gameStacksGetEndpoint).then((res) => {
        console.log(res.data);
        setGameStacks(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGameStacks();
  }, []);

  return (
    <div>
      <div>ListGameStacks</div>
      {gamestacks?.length > 0 ? (
        <div>
          {gamestacks.map((gamestack) => (
            <div key={gamestack["id"]}>{gamestack["id"]}</div>
          ))}
        </div>
      ) : (
        <div>No game stacks have been found</div>
      )}
    </div>
  );
}

export default ListGameStacks;
