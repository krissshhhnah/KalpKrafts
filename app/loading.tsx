"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5FBFD] px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 lg:px-12 xl:px-20 selection:bg-transparent">
      
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[#D8EAF1]/50 bg-white/80 px-4 sm:px-6 backdrop-blur-xl lg:px-8">
        <div className="h-7 sm:h-8 w-28 sm:w-36 animate-pulse rounded-lg bg-[#D8EAF1]/80" />
        <div className="hidden items-center gap-6 md:flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-16 animate-pulse rounded-md bg-[#D8EAF1]/50" />
          ))}
        </div>
        <div className="h-8 sm:h-9 w-24 sm:w-32 animate-pulse rounded-full bg-[#D8EAF1]/80" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Left Text Skeleton */}
          <div className="flex flex-col justify-center space-y-6 pt-8 lg:pt-0">
            <div className="h-6 w-56 animate-pulse rounded-full bg-[#D8EAF1]" />
            <div className="space-y-4">
              <div className="h-16 w-full animate-pulse rounded-2xl bg-[#D8EAF1]/60" />
              <div className="h-16 w-3/4 animate-pulse rounded-2xl bg-[#D8EAF1]/60" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full animate-pulse rounded-md bg-[#D8EAF1]/40" />
              <div className="h-4 w-5/6 animate-pulse rounded-md bg-[#D8EAF1]/40" />
              <div className="h-4 w-4/6 animate-pulse rounded-md bg-[#D8EAF1]/40" />
            </div>
            <div className="mt-6 flex gap-4">
              <div className="h-12 w-44 animate-pulse rounded-full bg-[#D8EAF1]" />
              <div className="h-12 w-36 animate-pulse rounded-full border border-[#D8EAF1] bg-transparent" />
            </div>
          </div>

          {/* Right Image Skeleton */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="aspect-[8/9] w-full max-w-[520px] animate-pulse rounded-[2rem] bg-gradient-to-tr from-[#D8EAF1]/30 to-[#D8EAF1]/70 shadow-sm" />
          </div>
        </div>

        {/* Below Fold Cards Skeleton */}
        <div className="mt-32 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm border border-[#D8EAF1]/30">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-[#D8EAF1]/80" />
              <div className="mt-2 h-5 w-3/4 animate-pulse rounded-md bg-[#D8EAF1]/60" />
              <div className="h-3 w-full animate-pulse rounded-md bg-[#D8EAF1]/30" />
              <div className="h-3 w-4/5 animate-pulse rounded-md bg-[#D8EAF1]/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
