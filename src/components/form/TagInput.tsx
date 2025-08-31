"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  focusLabel?: string;
  isRequired?: boolean;
  error?: string;
  onChange?: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  focusLabel,
  isRequired,
  error,
  onChange,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        const newTags = [...tags, input.trim()];
        setTags(newTags);
        onChange?.(newTags);
      }
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className="relative w-full font-sans">
      {/* Input field */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={label}
          className={`peer block w-full px-4 pt-6 font-normal py-1 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
            ${error ? "border-red-500" : ""}
          `}
        />

        <label
          className={`absolute left-4 top-3 text-[#555555] text-xs transition-all
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#555555] peer-focus:top-2 peer-focus:text-xs
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

export default TagInput;
