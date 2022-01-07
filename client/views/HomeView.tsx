import { useState } from "react"
import { Formik } from "formik"
import { useRouter } from "~/hooks/useRouter"
import { uuid } from "~/lib/uuid"
import { Connection } from "~/../shared/types"
import { useAtom } from "jotai"
import { activeConnectionAtom } from "~/lib/atoms"

export const HomeView = () => {
  const router = useRouter()

  const [, setActiveConnection] = useAtom(activeConnectionAtom)
  const [connections, setConnections] = useState<Connection[]>([
    {
      type: "pg",
      id: uuid(),
      nickname: "",
      host: "localhost",
      port: 5432,
      user: "postgres",
      database: "postgres",
      password: "pass",
    },
  ])

  const connect = async (connection: Connection) => {
    console.log(connection)
    const res = await querybase.createConnection(connection)
    if (res.type === "success") {
      setActiveConnection(connection)
      router.push(`/database`)
    } else {
      querybase.showErrorDialog({
        title: "Connection failed",
        content: res.error,
      })
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 h-full app-region-drag">
        <div className="h-10"></div>
        <div className="px-3">
          <button className="button app-region-nodrag">New Connection</button>
        </div>
      </div>
      <main className="flex-1 w-full p-5">
        {connections.map((connection) => {
          return (
            <div key={connection.id} className="bg-zinc-200 p-5 rounded-lg">
              <Formik
                initialValues={connection}
                onSubmit={(values) => {
                  connect(values)
                }}
              >
                {(form) => {
                  return (
                    <form onSubmit={form.handleSubmit}>
                      <div className="space-y-3">
                        <label className="flex space-x-3">
                          <span>Nickname</span>
                          <input
                            name="nickname"
                            placeholder="Nickname"
                            className="input"
                            value={form.values.nickname}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                          />
                        </label>
                        {form.values.type !== "sqlite" && (
                          <>
                            <label className="flex space-x-3">
                              <span>Host</span>
                              <input
                                name="host"
                                placeholder="Host"
                                className="input"
                                value={form.values.host}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                              />
                            </label>
                            <label className="flex space-x-3">
                              <span>Port</span>
                              <input
                                name="port"
                                placeholder="Port"
                                className="input"
                                value={form.values.port}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                              />
                            </label>
                            <label className="flex space-x-3">
                              <span>User</span>
                              <input
                                name="user"
                                placeholder="User"
                                className="input"
                                value={form.values.user}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                              />
                            </label>
                            <label className="flex space-x-3">
                              <span>Database</span>
                              <input
                                name="database"
                                placeholder="Database name"
                                className="input"
                                value={form.values.database}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                              />
                            </label>
                          </>
                        )}
                      </div>
                      <div className="mt-5">
                        <button type="submit" className="os-button">
                          Connect
                        </button>
                      </div>
                    </form>
                  )
                }}
              </Formik>
            </div>
          )
        })}
      </main>
    </div>
  )
}
