import { Router } from "~/hooks/useRouter"
import { DatabaseView } from "~/views/DatabaseView"
import { HomeView } from "~/views/HomeView"
import { SqlQueryView } from "~/views/SqlQueryView"
import { TableView } from "~/views/TableView"

export const App = () => {
  return (
    <Router
      routes={[
        { path: "/", element: <HomeView /> },
        {
          path: "/database",
          element: <DatabaseView />,
        },
        {
          path: "/sql-query",
          element: <SqlQueryView />,
        },
        {
          path: "/table",
          element: <TableView />,
        },
      ]}
    ></Router>
  )
}
