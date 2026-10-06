"use client";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search products...",
}: SearchBarProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-slate-300
                       px-4 py-3 text-sm placeholder-slate-400
                       focus:border-indigo-500 focus:outline-none
                       focus:ring-4 focus:ring-indigo-500/15 transition-shadow"
        />
    );           
}