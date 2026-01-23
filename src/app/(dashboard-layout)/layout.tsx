import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardLayout