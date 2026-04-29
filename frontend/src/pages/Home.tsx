import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { switchRoleApi } from "@/api/user.service";
import { jwtDecode } from "jwt-decode";
import {
  getAccessToken,
  setAccessToken
} from "@/utils/token";
import ServicesList from "./ServiceList";
import JobList from "./JobList";


type Role = "user" | "provider";

type TokenPayload = {
  userId: string;
  role: string[];
  activeRole: Role;
};

export default function HomePage() {

  const getInitialRole = (): Role => {

    try {

      const token =
        getAccessToken();

      if (!token) {
        return "user";
      }

      const decoded =
        jwtDecode<TokenPayload>(token);

      return decoded.activeRole || "user";

    } catch {

      return "user";

    }

  };

  const [activeRole, setActiveRole] =
    useState<Role>(getInitialRole);

  const [switching, setSwitching] =
    useState(false);


  const handleSwitch = async () => {

    if (switching) return;

    try {

      setSwitching(true);

      const nextRole =
        activeRole === "user"
          ? "provider"
          : "user";

      const data =
        await switchRoleApi(nextRole);

      setAccessToken(
        data.data.accessToken
      );

      setActiveRole(
        data.data.activeRole
      );

    } catch (error) {

      console.error(
        "Role switch failed",
        error
      );

    } finally {

      setSwitching(false);

    }

  };


  const handleMenuClick = (
    menu: string
  ) => {

    console.log(menu);

  };


  return (
    <div className="min-h-screen">

      <Navbar
        activeRole={activeRole}
        role={["user", "provider"]}
        onSwitch={handleSwitch}
        onMenuClick={handleMenuClick}
      />

      {activeRole === "user" && (
        <ServicesList />
      )}

      {activeRole === "provider" && (
        <JobList />
      )}

    </div>
  );
}