import { ReactNode } from "react"
import Header from "@/components/shared/main/Header"
import Footer from "@/components/shared/main/Footer"

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout