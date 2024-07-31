import { useEffect, useState } from "react";

import axios from "axios";

function ListGameStacks() {
  const [gamestacks, setGameStacks] = useState([]);

  async function fechGameStacks() {
    const gameStacksGetEndpoint =
      "https://" + import.meta.env.VITE_API_HTTPS_URL + "/gamestacks";

    try {
      const response = await axios.get(gameStacksGetEndpoint);
      console.log("response :" + response);

      setGameStacks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fechGameStacks();
    console.log("gamestacks :" + gamestacks);
  }, []);

  return <div>ListGameStacks</div>;
}

export default ListGameStacks;
