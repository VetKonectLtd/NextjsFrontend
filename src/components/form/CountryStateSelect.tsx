"use client";

import FormSelect from "./FormSelect";

interface Option {
  value: string;
  label: string;
}

interface CountryStateSelectProps {
  countries: { value: string; label: string; states: Option[] }[];
  countryValue: string;
  stateValue: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

const CountryStateSelect: React.FC<CountryStateSelectProps> = ({
  countries,
  countryValue,
  stateValue,
  onCountryChange,
  onStateChange,
}) => {
  const selectedCountry = countries.find((c) => c.value === countryValue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Country Select */}
      <FormSelect
        label="Country"
        focusLabel="Country (Required):"
        isRequired
        searchable
        options={countries.map((c) => ({ value: c.value, label: c.label }))}
        value={countryValue}
        onChange={(val) => {
          onCountryChange(val);
          onStateChange(""); // reset state when country changes
        }}
      />

      {/* State Select */}
      <FormSelect
        label="State"
        focusLabel="State (Required):"
        isRequired
        searchable
        disabled={!selectedCountry}
        options={selectedCountry?.states || []}
        value={stateValue}
        onChange={onStateChange}
      />
    </div>
  );
};

export default CountryStateSelect;
