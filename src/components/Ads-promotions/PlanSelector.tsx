"use client";

import { Button } from "@/components/ui/button";

export interface Plan {
  value: string;
  label: string;
  maxProducts: number;
  basePrice: number;
}

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: string;
  factor: number;
  onChange: (plan: string, factor: number) => void;
}

const PlanSelector = ({
  plans,
  selectedPlan,
  factor,
  onChange,
}: PlanSelectorProps) => {
  const currentPlan = plans.find((p) => p.value === selectedPlan);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      {/* Left: Plan list */}
      <div className="flex flex-col md:h-44 h-auto text-sm text-center gap-2 border-[1.5px] border-[rgba(29, 36, 50, 0.12)] shadow-[0px_11.23px_34.54px_0px_rgba(27,25,86,0.06)] rounded-2xl p-2 bg-white">
        {plans.map((plan) => (
          <div
            key={plan.value}
            onClick={() => onChange(plan.value, 1)}
            className={`p-1 rounded-2xl h-10 cursor-pointer  flex items-center justify-center text-sm ${
              selectedPlan === plan.value
                ? "bg-gray-150 font-bold"
                : "hover:bg-gray-225"
            }`}
          >
            {plan.label}
          </div>
        ))}
      </div>

      {/* Right: Plan details */}
      {currentPlan && (
        <div className="flex flex-col justify-between rounded-2xl h-full relative text-center shadow-[0px_11.23px_34.54px_0px_rgba(27,25,86,0.06)] border border-gray-225 bg-white overflow-hidden">
          {/* Content Wrapper */}
          <div className="p-4 flex flex-col items-center flex-grow w-full">
            {/* 1. Header Section - Prevent Wrapping */}
            <h3 className="font-bold text-base mb-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {currentPlan.label}{" "}
              {selectedPlan !== "weekly" && (
                <span className="text-sm">
                  ({factor} {selectedPlan})
                </span>
              )}
            </h3>
            <p className="text-base text-gray-500 mb-3 whitespace-nowrap">
              {currentPlan.maxProducts} Products Max
            </p>

            {/* 2. Factor selector - FORCE SINGLE LINE */}
            {selectedPlan !== "weekly" && (
              <div className="flex flex-nowrap items-center justify-center gap-2 mb-3 w-full">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onChange(selectedPlan, n)}
                    // Added flex-shrink-0 so buttons don't get squashed
                    // Added whitespace-nowrap so text doesn't break
                    className={`flex-shrink-0 w-8 h-8 flex items-center text-sm justify-center border border-gray-225 rounded-full transition-all ${
                      factor === n
                        ? "bg-gray-150 font-bold"
                        : "hover:bg-gray-100 shadow-sm"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

            {/* 3. Calculation - Single line, ellipsis if too long */}
            {selectedPlan !== "weekly" && (
              <p className="text-sm font-bold text-[#1D2432] mb-4 w-full whitespace-nowrap overflow-hidden text-ellipsis px-2">
                ${currentPlan.basePrice} x {factor} = $
                {(currentPlan.basePrice * factor).toFixed(2)}
              </p>
            )}

            {/* 4. Price Section - AUTO REDUCE LOGIC */}
            <div
              className="mt-auto w-full"
              // This style enables container queries for this specific div
              style={{ containerType: "inline-size" }}
            >
              <p className="text-xs text-gray-55 uppercase tracking-wide">
                Pricing (VAT Inclusive)
              </p>

              {/* font-bold leading-none: Tight line height
            text-[#1D2432]: Color
            whitespace-nowrap: NEVER WRAP
            
            style={{ fontSize: ... }}: 
            This is the magic. 
            "clamp(1.5rem, 15cqi, 3rem)" means:
            - Minimum size: 1.5rem (so it's not microscopic)
            - Target size: 15% of the container's width (auto-reduces!)
            - Maximum size: 3rem (so it doesn't get huge)
        */}
              <p
                className="font-bold mt-2 text-[#1D2432] whitespace-nowrap leading-none"
                style={{ fontSize: "clamp(1.5rem, 15cqi, 3.5rem)" }}
              >
                {selectedPlan === "free"
                  ? "$0.00"
                  : `$${(currentPlan.basePrice * factor).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
          </div>

          {/* Button */}
          <Button
            type="button"
            className="w-full rounded-t-none rounded-b-xl bg-[#555555] h-12 flex-shrink-0"
          >
            Select Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanSelector;
