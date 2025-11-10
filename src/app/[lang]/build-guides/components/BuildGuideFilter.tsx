"use client";

import { useState } from "react";

type FilterOption = "leveling" | "twink-leveling" | "endgame";

export function BuildGuideFilter() {
  const [filters, setFilters] = useState<Record<FilterOption, boolean>>({
    leveling: false,
    "twink-leveling": false,
    endgame: false,
  });

  const handleFilterChange = (option: FilterOption) => {
    setFilters((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.leveling}
            onChange={() => handleFilterChange("leveling")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">Leveling</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters["twink-leveling"]}
            onChange={() => handleFilterChange("twink-leveling")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">Twink Leveling</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.endgame}
            onChange={() => handleFilterChange("endgame")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">EndGame</span>
        </label>
      </div>
    </div>
  );
}
