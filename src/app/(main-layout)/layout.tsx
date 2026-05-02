import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { VisitorTracker } from "@/components/visitor-tracker"
import { ReactNode } from "react"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <VisitorTracker />
      <Navbar />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}

export default MainLayout