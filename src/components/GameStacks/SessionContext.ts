import { createContext, useContext } from "react";
import { Session } from "../../App";

export const SessionContext = createContext<Session | undefined>(undefined);

export function useSessionContext() {
  const session = useContext(SessionContext);

  if (session === undefined) {
    throw new Error("usSession must be used with a SessionContext");
  }

  return session;
}
