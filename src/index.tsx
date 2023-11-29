import { createContext, useContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { ContextType, PaddingStr } from './type';
import { titleCase } from './utils';

const storeIdsSet = new Set<string>([]);

export const createStore = <
  State extends object,
  MoreActions extends Record<string, Function>,
  Getters extends object
>(
  id: string,
  initStore: {
    states?: State;
    buildMoreActions?: (store: ContextType<State>) => MoreActions | void;
    buildGetters?: (store: ContextType<State>) => Getters | void;
  }
) => {
  type MethodName = PaddingStr<keyof State, 'set'>;

  if (storeIdsSet.has(id)) {
    throw new Error('[store: Error] Do not set repetitive id .');
  }

  const { buildMoreActions, buildGetters } = initStore;
  const states = initStore.states || ({} as State);

  const actions = {} as Record<MethodName, () => void>;

  Object.keys(states).forEach(key => {
    actions[`set${titleCase(key)}` as MethodName] = () => {};
  });

  const context = createContext<ContextType<State> & MoreActions & Getters>({
    ...states,
    ...actions,
  } as ContextType<State> & MoreActions & Getters);

  const ContextComp: FC<PropsWithChildren> = ({ children }) => {
    const { Provider } = context;
    const value = {} as ContextType<State>;

    Object.entries(states).forEach(([key, state]) => {
      const [data, setData] = useState(state);
      value[key as keyof State] = data;
      // @ts-ignore
      value[`set${titleCase(key)}` as MethodName] = setData as ContextType<State>[MethodName];
    });

    const moreActions = buildMoreActions?.(value);
    const getters = buildGetters?.(value);

    return <Provider value={Object.assign(value, moreActions, getters)}>{children}</Provider>;
  };

  ProviderList.push(ContextComp);

  const useStore = () => useContext(context);
  return useStore;
};

const ProviderList: FC<PropsWithChildren<{}>>[] = [];

export const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  let resultNode = children;

  while (ProviderList.length) {
    const Fc = ProviderList.pop();
    if (!Fc) break;
    resultNode = <Fc> {resultNode} </Fc>;
  }
  return <>{resultNode}</>;
};
