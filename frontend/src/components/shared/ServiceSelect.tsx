import { ServiceType } from "@/types/data";

interface Props {
   services: ServiceType[];
   selected: string[];
   onChange: (ids: string[]) => void;
}

export default function ServiceSelect({
   services,
   selected,
   onChange
}: Props) {

   const toggleService = (id: string) => {
      if (selected.includes(id)) {
         onChange(selected.filter(item => item !== id));
      } else {
         onChange([...selected, id]);
      }
   };

   return (
      <div className="space-y-4">
         <h3 className="text-lg font-semibold text-gray-800">
            Select Services
         </h3>

         <div className="space-y-3">
            {services.map(service => (
               <label
                  key={service._id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition
                  ${ selected.includes(service._id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                     }`}
               >
                  <input
                     type="checkbox"
                     checked={selected.includes(service._id)}
                     onChange={() => toggleService(service._id)}
                     className="w-4 h-4 accent-blue-600"
                  />

                  <span className="text-sm font-medium text-gray-700">
                     {service.serviceName}
                  </span>
               </label>
            ))}
         </div>
      </div>
   );
}