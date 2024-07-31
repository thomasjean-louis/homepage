import { useEffect, useState } from "react";

import axios from "axios";

function ListGameStacks() {
  const [gamestacks, setGameStacks] = useState([]);

  async function fechGameStacks() {
    const gameStacksGetEndpoint =
      import.meta.env.VITE_LOAD_BALANCER_HTTPS_URL + "/gamestacks";

    try {
      const response = await axios.get(gameStacksGetEndpoint);
      setGameStacks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fechGameStacks();
    console.log(gamestacks);
  }, []);

  return <div>ListGameStacks</div>;
}

export default ListGameStacks;
