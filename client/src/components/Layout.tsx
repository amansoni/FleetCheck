import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Sidebar } from "./Sidebar"
import { SidebarProvider } from "./ui/sidebar"

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto pt-16 pb-16">
            <main className="p-6">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}