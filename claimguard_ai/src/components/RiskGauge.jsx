import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRiskDetails } from '../utils/riskUtils';

export const RiskGauge = ({ score = 0, size = 220 }) => {
  // score between 0 and 1 (or 0 to 100)
  const targetPct = score > 1 ? score : Math.round(score * 100);
  const [displayValue, setDisplayValue] = useState(0);

  const riskInfo = getRiskDetails(targetPct);

  // Animated counter effect
  useEffect(() => {
    let start = 0;
    const duration = 1000; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = targetPct / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetPct) {
        setDisplayValue(targetPct);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetPct]);

  // SVG Gauge calculations based on 220x135 coordinate system
  const width = 220;
  const height = 135;
  const strokeWidth = 14;
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = Math.PI * radius; // Semi-circle
  const strokeDashoffset = circumference - (circumference * displayValue) / 100;
  const centerX = width / 2;
  const centerY = height - 10;

  return (
    <div className="flex flex-col items-center justify-center relative p-2 w-full max-w-[240px]">
      <div className="relative w-full aspect-[220/135] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          {/* Outer Background Track Arc */}
          <path
            d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0,1 ${centerX + radius},${centerY}`}
            fill="none"
            stroke="#262626"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Animated Value Arc */}
          <motion.path
            d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0,1 ${centerX + radius},${centerY}`}
            fill="none"
            stroke={riskInfo.fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0px 0px 8px ${riskInfo.fillColor}88)`
            }}
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 top-3 flex flex-col items-center justify-center text-center select-none">
          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#F5F5F5] tracking-tight"
          >
            {displayValue}%
          </motion.span>
          <span
            className="text-[11px] font-extrabold tracking-wider uppercase mt-1 px-2.5 py-0.5 rounded-full border shadow-sm"
            style={{
              color: riskInfo.fillColor,
              borderColor: `${riskInfo.fillColor}55`,
              backgroundColor: `${riskInfo.fillColor}18`
            }}
          >
            {riskInfo.level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;

