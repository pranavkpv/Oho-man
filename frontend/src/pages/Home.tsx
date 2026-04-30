import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { switchRoleApi } from "@/api/user.service";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, removeAccessToken, setAccessToken } from "@/utils/token";

import ServicesList from "./ServiceList";
import JobList from "./JobList";
import MyWorkList from "./MyWork";
import MyBookings from "./Mybooking";
import { useActiveToggle } from "@/hooks/useActiveToggle";
import { useNavigate } from "react-router-dom";

type Role = "user" | "provider";

type TokenPayload = {
  userId: string;
  role: string[];
  activeRole: Role;
  active: boolean;
};

const getRoleFromToken = (): Role => {
  try {
    const token = getAccessToken();
    if (!token) return "user";
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.activeRole || "user";
  } catch {
    return "user";
  }
};



const getDefaultMenu = (role: Role) =>
  role === "user" ? "Services" : "Jobs";

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<Role>(() => getRoleFromToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    navigate("/login");
  };
  const [selectedMenu, setSelectedMenu] = useState<string>(() =>
    getDefaultMenu(getRoleFromToken())
  );

  const getInitialActive = (): boolean => {
    try {
      const token = getAccessToken();
      if (!token) return false;
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.active ?? false;
    } catch {
      return false;
    }
  };

  const { active, toggleActive } = useActiveToggle(getInitialActive());
  const [switching, setSwitching] = useState(false);

  const handleSwitch = async () => {
    if (switching) return;
    try {
      setSwitching(true);

      const nextRole: Role = activeRole === "user" ? "provider" : "user";

      const res = await switchRoleApi(nextRole);
      const data = res?.data;

      if (data?.accessToken) setAccessToken(data.accessToken);

      if (data?.activeRole) {
        setActiveRole(data.activeRole);
        setSelectedMenu(getDefaultMenu(data.activeRole));
      }
    } catch (err) {
      console.error("Role switch failed", err);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f3ede3] to-[#faf9f7] font-serif relative overflow-hidden">

      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(139,109,80,0.08),transparent_45%)]" />

      {/* TOP BAR */}
      <div className={`flex justify-end items-center gap-4 px-6 py-2 border-b backdrop-blur-md transition-all
        ${ activeRole === "provider"
          ? "bg-gradient-to-r from-[#2d2418] to-[#4a3728]"
          : "bg-gradient-to-r from-[#1a2535] to-[#2c3e55]"
        }`}>

        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">
          Mode
        </span>

        {/* role switch */}
        <div className="flex items-center bg-white/10 border border-white/10 rounded-full p-1">
          {(["user", "provider"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={r !== activeRole ? handleSwitch : undefined}
              disabled={switching}
              className={`px-4 py-1 text-xs rounded-full capitalize transition-all duration-300
                ${ r === activeRole
                  ? activeRole === "provider"
                    ? "bg-gradient-to-r from-[#c9833a] to-[#e8a55a] text-white shadow-md"
                    : "bg-gradient-to-r from-[#3a6bc9] to-[#5a8ee8] text-white shadow-md"
                  : "text-white/40 hover:text-white"
                }`}
            >
              {switching && r !== activeRole ? "..." : r}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
        >
          Logout
        </button>

        {/* toggle */}
        <div className="flex items-center gap-2">
          <span className={`text-xs tracking-wide transition
            ${ active ? "text-green-400" : "text-white/30" }`}>
            {active ? "● Online" : "○ Offline"}
          </span>

          <button
            aria-label="active-deactive button"
            onClick={toggleActive}
            className={`w-9 h-5 rounded-full relative transition
              ${ active
                ? "bg-gradient-to-r from-green-500 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                : "bg-white/20"
              }`}
          >
            <div
              className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow
                ${ active ? "left-[18px]" : "left-[3px]" }`}
            />
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="relative z-10">
        <Navbar
          activeRole={activeRole}
          role={["user", "provider"]}
          onSwitch={handleSwitch}
          onMenuClick={setSelectedMenu}
          active={active}
          onActiveToggle={toggleActive}
        />
      </div>

      {/* MAIN */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 animate-[fadeIn_0.4s_ease]">

        {/* header */}
        <div className="flex items-center gap-4 mb-8">

          <span className={`px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border
            ${ activeRole === "provider"
              ? "bg-orange-50 text-orange-600 border-orange-200"
              : "bg-blue-50 text-blue-600 border-blue-200"
            }`}
          >
            {activeRole === "provider"
              ? "Provider Dashboard"
              : "User Dashboard"}
          </span>

          <span className="text-sm text-gray-500">
            {selectedMenu}
          </span>
        </div>

        {/* content */}
        <div className="animate-[fadeIn_0.3s_ease]">
          {activeRole === "user" && selectedMenu === "Services" && <ServicesList />}
          {activeRole === "provider" && selectedMenu === "Jobs" && <JobList />}
          {activeRole === "provider" && selectedMenu === "My work" && <MyWorkList />}
          {activeRole === "user" && selectedMenu === "My Bookings" && <MyBookings />}
        </div>
      </main>
    </div>
  );
}