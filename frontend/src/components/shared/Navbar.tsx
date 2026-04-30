import React, { useState } from "react";
import { PROVIDER_MENU, USER_MENU, USER_WITH_PROVIDER_MENU } from "@/constant/data";

type NavbarProps = {
  role?: string[];
  activeRole: "user" | "provider";
  onSwitch: () => void;
  onMenuClick: (menu: string) => void;
  active: boolean;
  onActiveToggle: () => void;
  loading?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({
  role,
  activeRole,
  onSwitch,
  onMenuClick,
  active,
  onActiveToggle,
  loading,
}) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isProvider = role?.includes("provider");
  const links =
    activeRole === "user"
      ? isProvider
        ? USER_WITH_PROVIDER_MENU
        : USER_MENU
      : PROVIDER_MENU;

  const handleMenuClick = (item: string) => {
    setActiveMenu(item);
    onMenuClick(item);
    setMobileOpen(false);
  };

  const isSwitch = (item: string) => item.toLowerCase().includes("switch");

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm shadow-amber-200">
            <span className="text-white text-xs font-black">O</span>
          </div>
          <span className="font-black text-stone-800 text-lg tracking-tight">
            OHO <span className="text-amber-500">Man</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((item, i) =>
            isSwitch(item) ? (
              <button
                key={i}
                onClick={onSwitch}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 border-amber-400 text-amber-600 hover:bg-amber-50 hover:border-amber-500 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                {item}
              </button>
            ) : (
              <button
                key={i}
                onClick={() => handleMenuClick(item)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeMenu === item
                    ? "bg-amber-50 text-amber-700 font-semibold"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
              >
                {item}
                {activeMenu === item && (
                  <span className="block mx-auto mt-0.5 w-1 h-1 rounded-full bg-amber-500" />
                )}
              </button>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Provider active toggle */}
          {activeRole === "provider" && (
            <div className="hidden md:flex items-center gap-2">
              <span className={`text-xs font-semibold transition-colors duration-200 ${active ? "text-emerald-600" : "text-stone-400"}`}>
                {active ? "Online" : "Offline"}
              </span>

              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  aria-label="toggle active status"
                  type="checkbox"
                  checked={active}
                  onChange={onActiveToggle}
                  disabled={loading}
                  className="sr-only peer"
                />
                {/* Track */}
                <div className="w-full h-full rounded-full bg-stone-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-emerald-500 transition-all duration-300 shadow-inner" />
                {/* Thumb */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 peer-checked:translate-x-5" />
                {/* Loading overlay */}
                {loading && (
                  <div className="absolute inset-0 rounded-full bg-white/50 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-stone-300 border-t-stone-500 animate-spin" />
                  </div>
                )}
              </label>

              {/* Status dot */}
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${active ? "bg-emerald-400 shadow-sm shadow-emerald-300 animate-pulse" : "bg-stone-300"}`} />
            </div>
          )}

          {/* Role badge */}
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
            activeRole === "provider"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${activeRole === "provider" ? "bg-amber-500" : "bg-blue-500"}`} />
            {activeRole === "provider" ? "Provider" : "User"}
          </div>

          {/* Mobile hamburger */}
          <button
          aria-label="mobile oprn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          >
            <div className="space-y-1">
              <span className={`block w-4 h-0.5 bg-stone-600 transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-4 h-0.5 bg-stone-600 transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-stone-600 transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/95 backdrop-blur-md px-6 py-4 space-y-1">
          {links.map((item, i) =>
            isSwitch(item) ? (
              <button
                key={i}
                onClick={() => { onSwitch(); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-amber-600 border-2 border-amber-200 hover:bg-amber-50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                {item}
              </button>
            ) : (
              <button
                key={i}
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeMenu === item
                    ? "bg-amber-50 text-amber-700 font-semibold"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                {item}
              </button>
            )
          )}

          {/* Mobile toggle */}
          {activeRole === "provider" && (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-stone-50 mt-2">
              <span className="text-sm font-medium text-stone-600">
                {active ? "🟢 Online" : "⚫ Offline"}
              </span>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                aria-label="select"
                  type="checkbox"
                  checked={active}
                  onChange={onActiveToggle}
                  disabled={loading}
                  className="sr-only peer"
                />
                <div className="w-full h-full rounded-full bg-stone-200 peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-emerald-500 transition-all duration-300" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 peer-checked:translate-x-5" />
              </label>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;