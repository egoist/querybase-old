import { contextBridge } from "electron"
import { ipcRenderer } from "electron-better-ipc"
import { QueryBase } from "../../shared/types"

const querybase: QueryBase = {
  createConnection(args) {
    return ipcRenderer.callMain("create-connection", args) as any
  },
  getAllDatabases() {
    return ipcRenderer.callMain("get-all-databases") as any
  },
  executeQuery(args) {
    return ipcRenderer.callMain("execute-query", args) as any
  },
  getTableNames(args) {
    return ipcRenderer.callMain("get-table-names", args) as any
  },
}

contextBridge.exposeInMainWorld("querybase", querybase)
