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
}

export type GetAllDatabases = () => Promise<QueryResponse<string[]>>

export type CreateConnection = (args: {
  name: string
}) => Promise<QueryResponse<void>>

export type ExecuteQuery = (args: {
  query: string
}) => Promise<QueryResponse<{ rows: any[]; fields: string[] }>>
