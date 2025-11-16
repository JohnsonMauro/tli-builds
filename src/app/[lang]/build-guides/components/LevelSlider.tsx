"use client";

import { type ReactNode } from "react";

interface LevelSliderProps {
  /**
   * Current level value (1-100)
   */
  level: number;
  /**
   * Callback when level changes
   */
  onLevelChange: (level: number) => void;
  /**
   * Minimum level (default: 1)
   */
  minLevel?: number;
  /**
   * Maximum level (default: 100)
   */
  maxLevel?: number;
}

export default function LevelSlider({
  level,
  onLevelChange,
  minLevel = 1,
  maxLevel = 100,
}: LevelSliderProps): ReactNode {
  // Calculate percentage for visual representation
  const percentage = ((level - minLevel) / (maxLevel - minLevel)) * 100;

  // Handle slider change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value, 10);
    onLevelChange(newLevel);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative h-12 flex items-center px-2">
        <input
          type="range"
          min={minLevel}
          max={maxLevel}
          value={level}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${percentage}%, #3f3f46 ${percentage}%, #3f3f46 100%)`,
          }}
          className="w-full h-2 rounded-full cursor-pointer relative z-0"
        />

        {/* Level display on thumb */}
        <div
          className="absolute pointer-events-none flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white"
          style={{
            left: `calc(${percentage}% - 20px)`,
            width: "40px",
            height: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#f97316",
            borderRadius: "4px",
            zIndex: 20,
          }}
        >
          {level}
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 40px;
          height: 40px;
          background: transparent;
          cursor: grab;
        }

        input[type="range"]::-webkit-slider-thumb:active {
          cursor: grabbing;
        }

        input[type="range"]::-moz-range-thumb {
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: grab;
        }

        input[type="range"]::-moz-range-thumb:active {
          cursor: grabbing;
        }

        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
