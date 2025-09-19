import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, BookOpen, Users, Compass, Calendar, Brain, Wallet, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

// Use lowercase URLs to match your <Route path="/...">
const navigationItems = [
  { title: "Home",       url: "/",         icon: Home,     gradient: "from-purple-500 to-pink-500" },
  { title: "Journal",    url: "/journal",  icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
  { title: "Community",  url: "/community",icon: Users,    gradient: "from-green-500 to-emerald-500" },
  { title: "Meditation", url: "/meditation",icon: Brain,   gradient: "from-indigo-500 to-purple-500" },
  { title: "Travel",     url: "/travel",   icon: Compass,  gradient: "from-orange-500 to-red-500" },
  { title: "Planner",    url: "/planner",  icon: Calendar, gradient: "from-teal-500 to-blue-500" },
  { title: "Finances",    url: "/finance",  icon: Wallet, gradient: "from-emerald-500 to-green-600" },
  { title: "Study Planner", url: "/study-planner", icon: GraduationCap, gradient: "from-indigo-500 to-purple-500" }
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --calm-gradient: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          --energy-gradient: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          --peace-gradient: linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%);
        }
        .mood-glow { box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3); }
        .floating-animation { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
      `}</style>

      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar is fixed on desktop, overlays on mobile via SidebarTrigger */}
          <Sidebar className="fixed left-0 top-0 bottom-0 z-40 w-64 shrink-0 border-r border-white/20 bg-white/80 backdrop-blur-xl hidden md:flex">
            <div className="flex flex-col h-full">
              <SidebarHeader className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mood-glow">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      FeelsSync
                    </h2>
                    <p className="text-sm text-gray-500">Your emotional wellness companion</p>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent className="p-4">
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-2">
                      {navigationItems.map((item) => {
                        const active = location.pathname === item.url;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className={`rounded-xl p-4 transition-all duration-300 hover:scale-105 ${
                                active
                                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                  : "hover:bg-white/60"
                              }`}
                            >
                              <Link to={item.url} className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </div>
          </Sidebar>

          {/* Main content: ensure it takes full width minus sidebar */}
          <main className="flex-1 min-h-screen w-full ml-0 md:ml-64 transition-all duration-300">
            {/* Mobile header with sidebar trigger */}
            <header className="bg-white/30 backdrop-blur-xl border-b border-white/20 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-white/60 p-2 rounded-lg transition-colors" />
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-purple-600" />
                  <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    FeelsSync
                  </h1>
                </div>
              </div>
            </header>

            {/* Page container - full width content */}
            <div className="w-full min-h-[calc(100vh-80px)] md:min-h-screen p-4 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}