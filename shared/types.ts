export type QueryResponse<T> =
  | {
      type: "success"
      data: T
    }
  | {
      type: "error"
      error: string
    }

export type QueryBase = {
  getAllDatabases: GetAllDatabases
  createConnection: CreateConnection
  executeQuery: ExecuteQuery
  getTableNames: GetTableNames
}

export type GetAllDatabases = () => Promise<QueryResponse<string[]>>

export type CreateConnection = (args: {
  name: string
}) => Promise<QueryResponse<void>>

export type ExecuteQuery = (args: {
  query: string
}) => Promise<QueryResponse<{ rows: any[]; fields: string[] }>>

export type GetTableNames = (args: {
  schema: string
}) => Promise<QueryResponse<string[]>>
