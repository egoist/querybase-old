import { atom } from "jotai"
import { Connection } from "~/../shared/types"

export const activeConnectionAtom = atom<Connection | null>(null)
