import { useNavigate, useLocation } from "react-router-dom"
import { Sidebar as SidebarComponent, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "./ui/sidebar"
import { LayoutDashboard, Users, Truck, FileText, BookOpen, BarChart3, Award, Settings, Menu } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Drivers", icon: Users, path: "/drivers" },
    { label: "Vehicles", icon: Truck, path: "/vehicles" },
    { label: "Inspections", icon: FileText, path: "/inspections" },
    { label: "Training", icon: BookOpen, path: "/training" },
    { label: "Scorecards", icon: Award, path: "/scorecards" },
    { label: "Reports", icon: BarChart3, path: "/reports" },
  ]

  // Add Users menu only for admin
  if (user?.role === 'admin') {
    menuItems.push({ label: "Users", icon: Settings, path: "/users" })
  }

  return (
    <SidebarComponent className="border-r bg-white/50 backdrop-blur-sm">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FI</span>
          </div>
          <span className="font-bold text-lg">FleetCheck</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                onClick={() => navigate(item.path)}
                isActive={location.pathname === item.path}
                className={location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarComponent>
  )
}