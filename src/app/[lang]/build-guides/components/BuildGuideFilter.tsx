"use client";

export type BuildFilterState = {
  leveling: boolean;
  twinkLeveling: boolean;
  endGame: boolean;
};

interface BuildGuideFilterProps {
  value: BuildFilterState;
  onChange: (next: BuildFilterState) => void;
}

export function BuildGuideFilter({ value, onChange }: BuildGuideFilterProps) {
  const handleToggle = (key: keyof BuildFilterState) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.leveling}
            onChange={() => handleToggle("leveling")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">Leveling</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.twinkLeveling}
            onChange={() => handleToggle("twinkLeveling")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">Twink Leveling</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.endGame}
            onChange={() => handleToggle("endGame")}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2"
          />
          <span className="text-sm font-medium">EndGame</span>
        </label>
      </div>
    </div>
  );
}
