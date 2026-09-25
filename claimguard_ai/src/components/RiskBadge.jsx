import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, FileWarning } from 'lucide-react';
import { getRiskDetails } from '../utils/riskUtils';

export const RiskBadge = ({ score, levelText, className = '' }) => {
  const details = getRiskDetails(score);
  const displayText = levelText || details.badgeText;

  const getIcon = () => {
    switch (details.level) {
      case 'LOW RISK':
        return ShieldCheck;
      case 'MEDIUM RISK':
        return AlertTriangle;
      case 'HIGH RISK':
        return ShieldAlert;
      case 'CRITICAL':
      default:
        return FileWarning;
    }
  };

  const IconComponent = getIcon();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border tracking-wide uppercase shadow-sm ${details.bgClass} ${className}`}
    >
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span>{displayText}</span>
    </span>
  );
};
