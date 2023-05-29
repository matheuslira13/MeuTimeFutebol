import { createContext, useContext, useState } from "react";

export const AppContextCodUser = createContext<any>(null!);

export const CodUserProvider = ({ children }: any) => {
  const [codUser, setCodUser] = useState("");

  return (
    <AppContextCodUser.Provider value={{ codUser, setCodUser }}>
      {children}
    </AppContextCodUser.Provider>
  );
};
