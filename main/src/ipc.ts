import { ipcMain } from "electron-better-ipc"
import knex, { Knex } from "knex"
import {
  CreateConnection,
  ExecuteQuery,
  GetAllDatabases,
  GetTableNames,
} from "../../shared/types"

let connection: Knex | undefined

export function listenForRenderer() {
  const createConnection: CreateConnection = async (args) => {
    if (connection) {
      await connection.destroy()
    }
    connection = knex({
      client: "pg",
      connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "pass",
        database: args.name,
      },
    })

    return { type: "success", data: void 0 }
  }

  const getAllDatabases: GetAllDatabases = async () => {
    if (!connection) return { type: "error", error: "No connection" }

    const res = await connection.raw(`SELECT datname FROM pg_database
          WHERE datistemplate = false;`)

    return { type: "success", data: res.rows.map((row: any) => row.datname) }
  }

  const executeQuery: ExecuteQuery = async (args) => {
    if (!connection) return { type: "error", error: "No connection" }

    const res = await connection.raw(args.query)

    return {
      type: "success",
      data: { rows: res.rows, fields: res.fields.map((f: any) => f.name) },
    }
  }

  const getTableNames: GetTableNames = async (args) => {
    if (!connection) return { type: "error", error: "No connection" }
    const res = await connection.raw(
      `SELECT table_name
FROM information_schema.tables
WHERE table_schema=?
 AND table_type='BASE TABLE'`,
      [args.schema]
    )

    return {
      type: "success",
      data: res.rows.map((row: any) => row.table_name),
    }
  }

  ipcMain.answerRenderer("create-connection", createConnection)
  ipcMain.answerRenderer("get-all-databases", getAllDatabases)
  ipcMain.answerRenderer("execute-query", executeQuery)
  ipcMain.answerRenderer("get-table-names", getTableNames)
}
