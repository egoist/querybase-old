import { Router } from "~/hooks/useRouter"
import { DatabaseView } from "~/views/DatabaseView"
import { HomeView } from "~/views/HomeView"
import { SqlQueryView } from "~/views/SqlQueryView"

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
      ]}
    ></Router>
  )
}
