import { ReactNode } from "react"
import Header from "@/components/shared/main/Header"
import Footer from "@/components/shared/main/Footer"
import ScrollToTop from "@/components/shared/main/ScrollToTop"

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default MainLayout