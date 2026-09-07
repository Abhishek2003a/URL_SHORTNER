import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Home,
  Link2,
  LogOut,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "My URLs", to: "/my-urls", icon: Link2 },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Profile", to: "/profile", icon: CircleUserRound },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const [loggingOut, setLoggingOut] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (loggingOut) return;

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      setLoggingOut(true);
      const result = await logout();
      if (result?.success !== false) {
        setMobileOpen(false);
        // Redirect user to home/login page
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-white/20 bg-black/80 p-2 text-gray-300 backdrop-blur-xl transition hover:bg-white/10 lg:hidden"
        aria-label="Open menu"
      >
        <Link2 size={20} />
      </button>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <div
            className={`flex items-center gap-3 ${collapsed ? "lg:mx-auto" : ""}`}
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black">
              <Link2 size={19} />
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-bold">SmartShortener</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">URL Platform</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Workspace
            </p>
          )}

          <nav className="space-y-1.5">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                  ${collapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`
                }
                title={collapsed ? label : undefined}
              >
                <Icon size={19} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="my-6 border-t border-white/10" />

          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Quick Action
            </p>
          )}

          <NavLink
            to="/create-url"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Create URL" : undefined}
          >
            <Plus size={19} />
            {!collapsed && <span>Create URL</span>}
          </NavLink>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={19} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed((value) => !value)}
          className="absolute -right-3 top-20 hidden h-7 w-7 place-items-center rounded-full border border-white/20 bg-black text-gray-400 shadow-xl hover:bg-white hover:text-black lg:grid"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
