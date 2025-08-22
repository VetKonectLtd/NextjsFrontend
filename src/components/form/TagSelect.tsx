"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface TagSelectProps {
  label: string;
  focusLabel?: string;
  isRequired?: boolean;
  error?: string;
  options: string[];
  onChange?: (tags: string[]) => void;
}

const TagSelect: React.FC<TagSelectProps> = ({
  label,
  focusLabel,
  isRequired,
  error,
  options,
  onChange,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const addTag = (value: string) => {
    if (value && !tags.includes(value)) {
      const newTags = [...tags, value];
      setTags(newTags);
      onChange?.(newTags);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className="relative w-full font-sans">
      {/* Select field */}
      <div className="relative">
        <select
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => addTag(e.target.value)}
          className={`peer block w-full px-4 pt-6 font-normal py-1 border bg-white border-[#1D2432] rounded-md text-sm focus:outline-none
            ${error ? "border-red-500" : ""}
          `}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {""}
          </option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label
          className={`absolute left-4 top-3 text-[#555555] text-xs transition-all
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#555555] peer-focus:top-2 peer-focus:text-sm
          `}
        >
          {isFocused && focusLabel ? focusLabel : label}
        </label>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default TagSelect;
