"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  focusLabel?: string;
  isRequired?: boolean;
  error?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  name?: string; // RHF
  onBlur?: () => void; // RHF
}

const TagInput: React.FC<TagInputProps> = ({
  label = "Tags",
  focusLabel,
  isRequired,
  error,
  value = [],
  onChange,
}) => {
  const [tags, setTags] = useState<string[]>(value);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTags(value || []);
  }, [value]);

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    onChange?.(newTags);
  };

  const addTag = () => {
    const clean = input.trim();
    if (clean !== "" && !tags.includes(clean)) {
      updateTags([...tags, clean]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      addTag();
    }

    if (e.key === "Backspace" && !input && tags.length) {
      updateTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="relative w-full font-sans">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={label}
            className={`peer block w-full px-4 pt-5 py-1 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
              ${error ? "border-red-500" : ""}
            `}
          />

          <label
            className={`absolute left-4 top-2 text-[#555555] text-xs transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#555555] peer-focus:top-1 peer-focus:text-xs
            `}
          >
            {isFocused && focusLabel ? focusLabel : label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>

        <button
          type="button"
          onClick={addTag}
          disabled={!input.trim()}
          className="px-3 py-3 bg-[#1D2432] text-white rounded-md text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add
        </button>
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

export default TagInput;
