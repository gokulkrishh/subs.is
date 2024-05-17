'use client';

import { createContext, useContext } from 'react';

import { User } from 'types/data';

type UserContextType = {
  user: User | null;
} | null;

const UserContext = createContext<UserContextType>(null);

type UserProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export const UserProvider = (props: UserProviderProps) => {
  const { user, children } = props;

  return <UserContext.Provider value={{ user } as UserContextType}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider.`);
  }

  return context as {
    user: User;
  };
};
