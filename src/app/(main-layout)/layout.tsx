import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ReactNode } from "react"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default MainLayout