import { atom } from "jotai"
import { Connection, Table } from "~/../shared/types"

export const activeConnectionAtom = atom<Connection | null>(null)

export const tablesAtom = atom<Table[]>([])
export const schemasAtom = atom<string[]>([])
