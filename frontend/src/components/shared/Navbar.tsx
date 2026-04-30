import React from "react";
import { Button } from "../ui/button";
import {
  PROVIDER_MENU,
  USER_MENU,
  USER_WITH_PROVIDER_MENU
} from "@/constant/data";

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
  loading
}) => {
  const isProvider = role?.includes("provider");

  const links =
    activeRole === "user"
      ? isProvider
        ? USER_WITH_PROVIDER_MENU
        : USER_MENU
      : PROVIDER_MENU;

  return (
    <div className="w-full border-b px-6 py-3 flex justify-between">

      <div className="font-bold text-lg">OHO Man</div>

      <div className="flex gap-3 items-center">
        {links.map((item, i) =>
          item.toLowerCase().includes("switch") ? (
            <Button key={i} onClick={onSwitch}>
              {item}
            </Button>
          ) : (
            <Button
              key={i}
              onClick={() => onMenuClick(item)}
            >
              {item}
            </Button>
          )
        )}
      </div>

      {activeRole === "provider" && (
        <label className="relative inline-block w-12 h-6 opacity-100">

          <input
            aria-label="on active"
            type="checkbox"
            checked={active}
            onChange={onActiveToggle}
            disabled={loading}  
            className="hidden peer"
          />

          {/* track */}
          <div className="
      w-full h-full bg-gray-300 rounded-full
      peer-checked:bg-green-500
      transition
      cursor-pointer
      opacity-100
    " />

          {/* thumb */}
          <div className="
      absolute top-1 left-1 w-4 h-4 bg-white rounded-full
      transition
      peer-checked:translate-x-6
      cursor-pointer
    " />

          {/* loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/40 rounded-full" />
          )}

        </label>
      )}

    </div>
  );
};

export default Navbar;