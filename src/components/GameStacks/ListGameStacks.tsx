import { useEffect, useState } from "react";

import axios from "axios";

function ListGameStacks() {
  const [gamestacks, setGameStacks] = useState([]);

  async function fetchGameStacks() {
    // const gameStacksGetEndpoint =
    //   "https://api.339713159350.realhandsonlabs.net/gamestacks";
    const gameStacksGetEndpoint =
      "https://" + import.meta.env.VITE_API_HTTPS_URL + "/gamestacks";

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

  return <div>ListGameStacks</div>;
}

export default ListGameStacks;
