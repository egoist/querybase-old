import { contextBridge, ipcRenderer } from "electron"
import { QueryBase } from "../../shared/types"

const querybase: QueryBase = {
  createConnection(args) {
    return ipcRenderer.invoke("create-connection", args)
  },
  getAllDatabases() {
    return ipcRenderer.invoke("get-all-databases")
  },
  executeQuery(args) {
    return ipcRenderer.invoke("execute-query", args)
  },
  getTables() {
    return ipcRenderer.invoke("get-tables")
  },
  showErrorDialog(args) {
    return ipcRenderer.invoke("show-error-dialog", args)
  },
}

contextBridge.exposeInMainWorld("querybase", querybase)
