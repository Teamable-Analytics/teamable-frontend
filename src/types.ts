import { ReactNode } from "react"

export type NonEmptyArray<T> = [T, ...T[]];

export interface Action {
  onClick: () => void;
  content: ReactNode;
  loading: boolean;
}
