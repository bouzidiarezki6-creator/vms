import React from 'react';
import { cn } from '../../lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton — pulse shimmer placeholder used as the Suspense fallback while
// lazy-loaded portal chunks are being fetched.
// ─────────────────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200', className)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageSkeleton — full-page shimmer shown while a portal chunk loads
// ─────────────────────────────────────────────────────────────────────────────
export function PageSkeleton() {
  return (
    <div className="space-y-6 w-full" role="status" aria-label="Chargement en cours…">
      {/* Hero / header bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-200 to-slate-100 h-40 w-full animate-pulse" />

      {/* KPI card row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-14" />
            <Skeleton className="h-2 w-24" />
          </div>
        ))}
      </div>

      {/* Content row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-6 space-y-4 shadow-sm">
          <Skeleton className="h-4 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-2 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 space-y-3 shadow-sm">
        <Skeleton className="h-4 w-32 mb-4" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>

      <span className="sr-only">Chargement en cours…</span>
    </div>
  );
}
