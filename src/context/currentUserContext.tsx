// context/CurrentUserContext.tsx
import { createContext, useState, ReactNode } from "react";
import { UserData } from "../type/type";

interface CurrentUserContextType {
  user?: UserData;
  setUser: (user?: UserData) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  user: undefined,
  setUser: () => {},
});

// da qui in poi potrebbe essere il superfluo. ho avuto difficoltà ad fare le rotte senza questa tipologia di scrittura che nell'altro esercizio non c'era.

export const CurrentUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
