import React from 'react';
import { Sparkles } from 'lucide-react';

export const SectionHeader = ({
  badgeText,
  title,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badgeText && (
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30 mb-3.5 shadow-sm shadow-[#00C878]/10 ${centered ? 'mx-auto' : ''}`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badgeText}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#F5F5F5] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#A3A3A3] font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

