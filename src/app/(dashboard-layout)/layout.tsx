import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout