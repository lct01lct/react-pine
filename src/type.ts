import { Dispatch, SetStateAction } from 'react';

export type PaddingStr<State, Str extends string> = State extends `${infer First}${infer Rest}`
  ? `${Str}${Uppercase<First>}${Rest}`
  : never;

type ActionType<State extends object> = {
  [Key in keyof State as PaddingStr<Key, 'set'>]: Dispatch<SetStateAction<State[Key]>>;
};

export type ContextType<State extends object> = State & ActionType<State>;
