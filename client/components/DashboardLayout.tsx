import { DashboardHeader } from "./DashboardHeader"

export const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="h-full overflow-auto">{children}</div>
    </div>
  )
}
