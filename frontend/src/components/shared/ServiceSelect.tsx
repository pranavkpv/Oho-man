import { ServiceType } from "@/types/data";

interface Props {
  services: ServiceType[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export default function ServiceSelect({ services, selected, onChange }: Props) {
  const toggleService = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Select Services
        </h3>
        {selected.length > 0 && (
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            {selected.length} selected
          </span>
        )}
      </div>

      {/* Empty state */}
      {services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
          <span className="text-2xl mb-1 opacity-30">🛠️</span>
          <p className="text-xs text-stone-400 font-medium">No services available</p>
        </div>
      )}

      {/* Service list */}
      <div className="space-y-2">
        {services.map((service) => {
          const isSelected = selected.includes(service._id);
          return (
            <label
              key={service._id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-amber-300 bg-amber-50/60 shadow-sm shadow-amber-100"
                  : "border-stone-100 bg-stone-50/60 hover:border-stone-200 hover:bg-stone-50"
              }`}
            >
              {/* Custom checkbox */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400 shadow-sm shadow-amber-200"
                    : "border-stone-300 bg-white"
                }`}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </div>

              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleService(service._id)}
                className="sr-only"
              />

              <span className={`text-sm font-medium transition-colors duration-200 ${isSelected ? "text-amber-700" : "text-stone-600"}`}>
                {service.serviceName}
              </span>

              {isSelected && (
                <span className="ml-auto text-amber-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}