import { DashboardLayout } from "~/components/DashboardLayout"
import { useRouter } from "~/hooks/useRouter"

export const TableView = () => {
  const router = useRouter()

  return <DashboardLayout>table: {router.query.name}</DashboardLayout>
}
