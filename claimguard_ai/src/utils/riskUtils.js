// Risk category classification & visual color tokens

export const getRiskDetails = (score) => {
  // score is 0.0 to 1.0 (or percentage 0 to 100)
  const pct = score > 1 ? score : score * 100;

  if (pct < 30) {
    return {
      level: 'LOW RISK',
      color: '#22C55E', // Green
      bgClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      fillColor: '#22C55E',
      badgeText: 'Low Risk',
      summary: 'The submitted claim parameters show low anomaly probability and align with standard legitimate vehicle insurance profiles.'
    };
  } else if (pct < 60) {
    return {
      level: 'MEDIUM RISK',
      color: '#F59E0B', // Amber/Yellow
      bgClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      fillColor: '#F59E0B',
      badgeText: 'Medium Risk',
      summary: 'Minor inconsistencies detected in claim timing or deductible ratio. Moderate verification recommended.'
    };
  } else if (pct < 80) {
    return {
      level: 'HIGH RISK',
      color: '#F97316', // Orange
      bgClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      fillColor: '#F97316',
      badgeText: 'High Risk',
      summary: 'ClaimGuard AI estimates that this claim has a relatively high probability of being fraudulent due to key risk indicators.'
    };
  } else {
    return {
      level: 'CRITICAL',
      color: '#EF4444', // Red
      bgClass: 'bg-red-500/10 text-red-400 border-red-500/30',
      fillColor: '#EF4444',
      badgeText: 'Critical Risk',
      summary: 'Multiple high-impact risk factors detected (e.g. absent police report, high claim/price ratio, recent address change). Thorough investigation required.'
    };
  }
};
