import React from 'react';
import { Card } from './Card';

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtext,
  trend,
  glass = false,
  accentColor = '#00C878'
}) => {
  return (
    <Card glass={glass} className="relative overflow-hidden group p-5 sm:p-6">
      {/* Background radial glow effect */}
      <div 
        className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full opacity-10 blur-2xl pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
        style={{ backgroundColor: accentColor }}
      />
      
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs sm:text-sm font-medium text-[#A3A3A3] truncate">{title}</span>
        {Icon && (
          <div 
            className="p-2 sm:p-2.5 rounded-xl bg-[#141414] border border-[#343434] text-[#00C878] group-hover:border-[#00C878]/50 transition-colors shrink-0 shadow-sm"
            style={{ color: accentColor }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline flex-wrap gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] font-heading tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00C878] border border-[#00C878]/30">
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-xs text-[#737373] line-clamp-2 leading-relaxed">
          {subtext}
        </p>
      )}
    </Card>
  );
};

export default StatCard;

