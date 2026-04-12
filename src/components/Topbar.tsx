'use client';

import { Bell, Search, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-canvas border-b border-surface-border sticky top-0 z-10">
      <div className="flex-1 flex justify-start">
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            className="w-full bg-surface text-gray-200 border border-surface-border rounded-md pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-mono placeholder:font-sans placeholder:text-gray-600"
            placeholder="Search functionality or documentation..."
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
        </button>
        <div className="w-8 h-8 rounded border border-surface-border bg-surface flex items-center justify-center cursor-pointer transition-colors hover:border-gray-500">
          <User className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
