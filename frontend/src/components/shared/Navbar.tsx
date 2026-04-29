import React from "react";
import { Button } from "../ui/button";
import { PROVIDER_MENU, USER_MENU, USER_WITH_PROVIDER_MENU } from "@/constant/data";

type NavbarProps = {
   role?: string[];
   activeRole: "user" | "provider";
   onSwitch: () => void;
   onMenuClick: (menu: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
   role,
   activeRole,
   onSwitch,
   onMenuClick
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
      </div>
   );
};

export default Navbar;