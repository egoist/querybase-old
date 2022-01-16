import { dialog, ipcMain } from "electron"
import { Client } from "pg"
import {
  CreateConnection,
  ExecuteQuery,
  GetAllDatabases,
  GetTables,
  ShowErrorDialog,
} from "../../shared/types"

let connection: Client | undefined

const wrapHandler = (handler: (args: any) => Promise<any>) => {
  return async (event: any, args: any) => {
    try {
      return await handler(args)
    } catch (error: any) {
      console.log("querybase api error", error)
      return { type: "error", error: error.message }
    }
  }
}

export function listenForRenderer() {
  const createConnection: CreateConnection = async (args) => {
    if (connection) {
      await connection.end()
      connection = undefined
    }
    if (args.type === "sqlite") {
      return { type: "error", error: "SQLite is not supported yet" }
    }
    connection = new Client({
      host: args.host,
      port: args.port,
      user: args.user,
      password: args.password,
      database: args.database,
    })
    await connection.connect().catch((error) => {
      connection = undefined
      throw error
    })
    return { type: "success", data: void 0 }
  }

  const getAllDatabases: GetAllDatabases = async () => {
    if (!connection) throw new Error("No connection")

    const res = await connection.query(`SELECT datname FROM pg_database
          WHERE datistemplate = false;`)

    return { type: "success", data: res.rows.map((row: any) => row.datname) }
  }

  const executeQuery: ExecuteQuery = async (args) => {
    if (!connection) throw new Error("No connection")

    const res = await connection.query(args.query)

    return {
      type: "success",
      data: { rows: res.rows, fields: res.fields.map((f: any) => f.name) },
    }
  }

  const getTables: GetTables = async () => {
    if (!connection) throw new Error("No connection")
    const res = await connection.query({
      text: `SELECT table_name, table_schema, table_type
       FROM information_schema.tables`,
    })
    const schemas = [...new Set(res.rows.map((row: any) => row.table_schema))]
    return {
      type: "success",
      data: {
        tables: res.rows.map((row: any) => ({
          name: row.table_name,
          schema: row.table_schema,
          type: row.table_type,
        })),
        schemas,
      },
    }
  }

  const showErrorDialog: ShowErrorDialog = async (args) => {
    dialog.showErrorBox(args.title, args.content)
  }

  ipcMain.handle("create-connection", wrapHandler(createConnection))
  ipcMain.handle("get-all-databases", wrapHandler(getAllDatabases))
  ipcMain.handle("execute-query", wrapHandler(executeQuery))
  ipcMain.handle("get-tables", wrapHandler(getTables))
  ipcMain.handle("show-error-dialog", wrapHandler(showErrorDialog))
}
