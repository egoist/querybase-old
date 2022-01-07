import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { DashboardHeader } from "~/components/DashboardHeader"
import { Link } from "~/components/Link"
import { activeConnectionAtom } from "~/lib/atoms"

export const DatabaseView = () => {
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    querybase.getTableNames({ schema: "public" }).then((res) => {
      if (res.type === "success") {
        setTables(res.data)
      } else {
        querybase.showErrorDialog({
          title: "Failed to get tables",
          content: res.error,
        })
      }
    })
  }, [])

  return (
    <div>
      <DashboardHeader />
      <div className="p-5 table-grid">
        <Link
          to="/sql-query"
          className=" inline-flex flex-col justify-center items-center cursor-default"
        >
          <span className="border p-2 mb-3">
            <svg className="w-16 h-16 text-zinc-500" viewBox="0 0 1024 1024">
              <defs></defs>
              <path
                d="M301.3 496.7c-23.8 0-40.2-10.5-41.6-26.9H205c.9 43.4 36.9 70.3 93.9 70.3c59.1 0 95-28.4 95-75.5c0-35.8-20-55.9-64.5-64.5l-29.1-5.6c-23.8-4.7-33.8-11.9-33.8-24.2c0-15 13.3-24.5 33.4-24.5c20.1 0 35.3 11.1 36.6 27h53c-.9-41.7-37.5-70.3-90.3-70.3c-54.4 0-89.7 28.9-89.7 73c0 35.5 21.2 58 62.5 65.8l29.7 5.9c25.8 5.2 35.6 11.9 35.6 24.4c.1 14.7-14.5 25.1-36 25.1z"
                fill="currentColor"
              ></path>
              <path
                d="M928 140H96c-17.7 0-32 14.3-32 32v496c0 17.7 14.3 32 32 32h380v112H304c-8.8 0-16 7.2-16 16v48c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-48c0-8.8-7.2-16-16-16H548V700h380c17.7 0 32-14.3 32-32V172c0-17.7-14.3-32-32-32zm-40 488H136V212h752v416z"
                fill="currentColor"
              ></path>
              <path
                d="M828.5 486.7h-95.8V308.5h-57.4V534h153.2zm-298.6 53.4c14.1 0 27.2-2 39.1-5.8l13.3 20.3h53.3L607.9 511c21.1-20 33-51.1 33-89.8c0-73.3-43.3-118.8-110.9-118.8s-111.2 45.3-111.2 118.8c-.1 73.7 43 118.9 111.1 118.9zm0-190c31.6 0 52.7 27.7 52.7 71.1c0 16.7-3.6 30.6-10 40.5l-5.2-6.9h-48.8L542 491c-3.9.9-8 1.4-12.2 1.4c-31.7 0-52.8-27.5-52.8-71.2c.1-43.6 21.2-71.1 52.9-71.1z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span>SQL Query</span>
        </Link>
      </div>
      <div className="p-5 table-grid">
        {tables.sort().map((name) => {
          return (
            <div
              key={name}
              className="group select-none inline-flex flex-col items-center justify-center space-y-1"
            >
              <span className="rounded inline-flex items-center justify-center group-active:bg-zinc-200">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    d="M9 3H3v6h6V3ZM15 3H9v6h6V3ZM21 3h-6v6h6V3ZM9 9H3v6h6V9ZM15 9H9v6h6V9ZM21 9h-6v6h6V9ZM9 15H3v6h6v-6ZM15 15H9v6h6v-6ZM21 15h-6v6h6v-6Z"
                  />
                </svg>
              </span>
              <span className="p-1 rounded h-5 inline-flex items-center group-active:text-white group-active:bg-blue-500">
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
