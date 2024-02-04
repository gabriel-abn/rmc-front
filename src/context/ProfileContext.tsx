"use client";

import { User } from "@/types/user";
import * as React from "react";

export type UserContextProps = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<UserContextProps>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User>({} as User);

  // React.useEffect(() => {
  //   const set = async () => {
  //     const token = sessionStorage.getItem("accessToken");

  //     if (!token) return;

  //     fetch({
  //       url: "/account/profile",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .GET()
  //       .then((res) => {
  //         console.log(res);
  //         setUser(res);
  //       });
  //   };

  //   set();
  // });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
