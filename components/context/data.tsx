'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { SubscriptionsModified, User } from 'types/data';

type DataContextType = {
  subscriptions: SubscriptionsModified[];
} | null;

const DataContext = createContext<DataContextType>(null);

type DataProviderProps = {
  children: React.ReactNode;
  data: SubscriptionsModified[];
};

export const DataProvider = (props: DataProviderProps) => {
  const { data, children } = props;
  const [subscriptions, setSubscriptions] = useState(data);

  const setData = useCallback(
    (modifiedSubscriptions: SubscriptionsModified[], isReset?: boolean) => {
      if (isReset) {
        setSubscriptions(data);
      } else {
        setSubscriptions(modifiedSubscriptions);
      }
    },
    [data],
  );

  const value = useMemo(() => {
    return { subscriptions, setSubscriptions: setData };
  }, [subscriptions, setData]);

  return <DataContext.Provider value={value as DataContextType}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(`useData must be used within a DataProvider.`);
  }

  return context as {
    subscriptions: SubscriptionsModified[];
    setSubscriptions: (modifiedSubscriptions: SubscriptionsModified[], isReset?: boolean) => void;
  };
};
