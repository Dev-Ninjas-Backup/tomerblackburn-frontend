import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
  subtitle?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  className = "",
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) => {
    const query = searchQuery.toLowerCase();
    return (
      opt.label.toLowerCase().includes(query) ||
      opt.subtitle?.toLowerCase().includes(query)
    );
  });

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full border rounded px-3 py-2 text-sm text-left flex items-center justify-between bg-white hover:bg-gray-50 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className="ml-2 shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-2 border-b">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex flex-col"
                >
                  <span className="font-medium">{opt.label}</span>
                  {opt.subtitle && (
                    <span className="text-gray-600 text-xs">
                      {opt.subtitle}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
