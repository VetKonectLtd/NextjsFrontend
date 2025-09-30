"use client";

import { useState } from "react";
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
      <div className="flex flex-col md:h-44 h-auto text-sm text-center gap-2 border border-gray-225 shadow-lg rounded-2xl p-2 bg-white">
        {plans.map((plan) => (
          <div
            key={plan.value}
            onClick={() => onChange(plan.value, 1)}
            className={`p-1 rounded-2xl cursor-pointer ${
              selectedPlan === plan.value
                ? "bg-gray-225 font-medium"
                : "hover:bg-gray-225"
            }`}
          >
            {plan.label}
          </div>
        ))}
      </div>

      {/* Right: Plan details */}
      {currentPlan && (
        <div className="rounded-2xl md:h-60 h-auto relative text-center p-4 shadow-lg border border-gray-225 bg-white">
          <h3 className="font-semibold text-sm mb-1">
            {currentPlan.label}{" "}
            {selectedPlan !== "weekly" && `(${factor} ${selectedPlan})`}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {currentPlan.maxProducts} Products Max
          </p>

          {/* Factor selector */}
          {selectedPlan !== "weekly" && (
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(selectedPlan, n)}
                  className={`w-5 h-5 flex items-center text-sm justify-center border border-gray-225 rounded-full ${
                    factor === n
                      ? "bg-primary-400 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="mb-9">
            <p className="text-xs text-gray-55">Pricing (VAT Inclusive)</p>
            <p className="text-lg font-bold">
              {selectedPlan === "free"
                ? "$0.00"
                : `$${(currentPlan.basePrice * factor).toFixed(2)}`}
            </p>
          </div>

          <Button type="button" className="w-full absolute bottom-0 left-0 rounded-t-none rounded-b-xl">
            Select Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanSelector;
