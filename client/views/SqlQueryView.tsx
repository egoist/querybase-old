import { useState } from "react"

export const SqlQueryView = () => {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<any[]>([])
  const [fields, setFields] = useState<string[]>([])

  const execute = async () => {
    const res = await querybase.executeQuery({ query })
    console.log(res)
    if (res.type === "success") {
      setRows(res.data.rows)
      setFields(res.data.fields)
    }
  }

  return (
    <div>
      <div className="p-2">
        <textarea
          className="border rounded-lg w-full p-1"
          rows={10}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <div>
          <button
            onClick={execute}
            className="bg-blue-500 border rounded-lg text-white px-3 h-8 inline-flex items-center text-sm"
          >
            Execute Query
          </button>
        </div>
      </div>
      <div className="border-t overflow-auto">
        <table className="w-full">
          <thead className="border-b border-zinc-200">
            <tr className="bg-zinc-50 divide-x divide-zinc-100">
              {fields.map((field) => {
                return (
                  <th
                    className="font-normal text-left px-2 text-sm"
                    key={field}
                  >
                    {field}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr className="divide-x divide-zinc-100" key={index}>
                  {fields.map((field) => {
                    return (
                      <td key={field} className="px-2">
                        {String(row[field])}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
