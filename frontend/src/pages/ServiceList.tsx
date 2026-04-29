import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";

export default function ServicesList() {

  const navigate = useNavigate();

  const {
    services,
    loading,
    error
  } = useServices(true);

  if (loading) {
    return (
      <p className="p-6">
        Loading services...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

      {services?.map((service) => (
        <div
          key={service._id.toString()}
          onClick={() =>
            navigate(`/users/${service._id}`)
          }
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
  );
}