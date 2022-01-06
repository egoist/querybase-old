import { useEffect, useState } from "react"
import { Link } from "~/components/Link"

export const DatabaseView = () => {
  const [tables, setTables] = useState<string[]>([])
  useEffect(() => {
    querybase.getTableNames({ schema: "public" }).then((res) => {
      if (res.type === "success") {
        setTables(res.data)
      }
    })
  }, [])
  return (
    <div>
      <Link to="/sql-query">SQL Query</Link>
      {tables.map((name) => {
        return <div key={name}>{name}</div>
      })}
    </div>
  )
}
