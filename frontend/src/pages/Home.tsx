import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { switchRoleApi } from "@/api/user.service";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, setAccessToken } from "@/utils/token";

import ServicesList from "./ServiceList";
import JobList from "./JobList";
import MyWorkList from "./MyWork";
import MyBookings from "./Mybooking";
import { useActiveToggle } from "@/hooks/useActiveToggle";

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

      const nextRole: Role =
        activeRole === "user" ? "provider" : "user";

      const res = await switchRoleApi(nextRole);

      const data = res?.data;

      const newRole = data?.activeRole;

      // ✅ update token safely
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }

      if (newRole) {
        setActiveRole(newRole);
        setSelectedMenu(getDefaultMenu(newRole));
      }

    } catch (err) {
      console.error("Role switch failed", err);
    } finally {
      setSwitching(false);
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="min-h-screen">

      <Navbar
        activeRole={activeRole}
        role={["user", "provider"]}
        onSwitch={handleSwitch}
        onMenuClick={handleMenuClick}
        active={active}
        onActiveToggle={toggleActive}
      />

      {activeRole === "user" && selectedMenu === "Services" && (
        <ServicesList />
      )}

      {activeRole === "provider" && selectedMenu === "Jobs" && (
        <JobList />
      )}

      {activeRole === "provider" && selectedMenu === "My work" && (
        <MyWorkList />
      )}

      {activeRole === "user" && selectedMenu === "My Bookings" && (
        <MyBookings />
      )}
    </div>
  );
}