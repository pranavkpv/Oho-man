import Navbar from "@/components/shared/Navbar";
import { useState } from "react";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<"user" | "provider">("user");
  const [shouldFetchServices, setShouldFetchServices] = useState(true);
  const navigate = useNavigate();

  const {
    services,
    loading,
    error,
  } = useServices(shouldFetchServices);

  const handleSwitch = () => {
    setActiveRole((prev) =>
      prev === "user" ? "provider" : "user"
    );
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "Services") {
      setShouldFetchServices(true);
    }
    if (menu === "My Bookings") {
      navigate("/bookings");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        activeRole={activeRole}
        role={["user", "provider"]}
        onSwitch={handleSwitch}
        onMenuClick={handleMenuClick}
      />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <p>Loading services...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {services?.map((service) => (
          <div
            key={service._id.toString()}
            onClick={() => navigate(`/users/${ service._id }`)}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <img
              src={service.image}
              alt={service.serviceName}
              className="w-full h-40 object-cover rounded-md"
            />

            <h2 className="text-lg font-semibold mt-2">
              {service.serviceName}
            </h2>

            <p className="text-muted-foreground mt-1">
              💰 ₹{service.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}