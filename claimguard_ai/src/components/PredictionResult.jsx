import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  FileWarning, 
  BarChart2, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Award, 
  Zap 
} from 'lucide-react';
import { Card } from './Card';
import { RiskGauge } from './RiskGauge';
import { RiskBadge } from './RiskBadge';
import { Button } from './Button';
import { getRiskDetails } from '../utils/riskUtils';
import { formatCurrency } from '../utils/formatters';

export const PredictionResult = ({ result, onReset }) => {
  const riskScorePct = result.risk_percentage ?? Math.round((result.probability ?? result.risk_score ?? 0) * 100);
  const details = getRiskDetails(riskScorePct);
  const benchmarks = result.personalized_benchmarks || {
    userClaim: 25000,
    avgClaim: 22864,
    userPrice: 24000,
    avgPrice: 22925,
    userSafety: 75,
    avgSafety: 73.7,
    userPrevClaims: 0,
    avgPrevClaims: 0.5
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      
      {/* 1. TOP OVERVIEW CARD */}
      <Card glass className="p-6 sm:p-8 border-[#00C878]/30 relative overflow-hidden shadow-2xl">
        {/* Ambient Glow */}
        <div 
          className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: details.fillColor }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Gauge Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#343434] pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider mb-2 font-heading">
              Random Forest Anomaly Score
            </span>
            <RiskGauge score={riskScorePct} size={220} />
          </div>

          {/* Verdict Details Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <RiskBadge score={riskScorePct} levelText={result.risk_level || details.level} />
              <span className="text-xs text-[#8E8E8E] font-medium bg-[#141414] px-2.5 py-1 rounded-full border border-[#343434]">
                Model Probability: {riskScorePct}%
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F5F5F5] tracking-tight leading-snug">
              {result.prediction === 1 ? 'Potential Fraud Detected' : 'Not Fraud — Standard Legitimate Claim'}
            </h3>

            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              {result.explanation || details.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#F5F5F5]">
              <div className="p-2.5 rounded-xl bg-[#141414] border border-[#343434] flex items-center gap-2 shadow-sm">
                <span className="text-[#8E8E8E]">Key Risk Drivers:</span>
                <span className="font-bold text-[#00C878]">
                  {result.contributing_factors ? result.contributing_factors.length : 0} Evaluated
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141414] border border-[#343434] flex items-center gap-2 shadow-sm">
                <span className="text-[#8E8E8E]">Inference Latency:</span>
                <span className="font-bold text-[#22D3EE] flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {result.inference_time_ms ? `${result.inference_time_ms}ms` : '18ms'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141414] border border-[#343434] flex items-center gap-2 shadow-sm">
                <span className="text-[#8E8E8E]">Model Algorithm:</span>
                <span className="font-bold text-[#8BEF4A]">Random Forest</span>
              </div>
            </div>

          </div>

        </div>
      </Card>

      {/* 2. CONTRIBUTING RISK DRIVERS BREAKDOWN */}
      <Card glass className="space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#343434]/80 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#00C878]" />
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">
              Key Risk Contributing Factors
            </h3>
          </div>
          <span className="text-xs text-[#737373] bg-[#141414] px-2.5 py-1 rounded-full border border-[#343434] self-start sm:self-auto">
            Model Explainability Breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {result.contributing_factors && result.contributing_factors.map((factor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="p-4 rounded-xl bg-[#141414] border border-[#343434] hover:border-[#00C878]/40 transition-colors space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#F5F5F5]">{factor.title}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${
                  factor.impact.toLowerCase().includes('high') 
                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                    : factor.impact.toLowerCase().includes('medium')
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-[#00C878] border-[#00C878]/30'
                }`}>
                  {factor.impact}
                </span>
              </div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                {factor.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* 3. PERSONALIZED USER ANALYTICS COMPARISON */}
      <Card glass className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#343434]/80 pb-4">
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-5 h-5 text-[#8BEF4A]" />
            <div>
              <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">
                Personalized Benchmarking & Comparison
              </h3>
              <p className="text-xs text-[#A3A3A3]">Comparing submitted parameters against historical portfolio dataset averages</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Claim Amount Benchmark */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#343434] space-y-2.5">
            <span className="text-xs text-[#A3A3A3] font-medium">Total Claim Amount</span>
            <div className="text-lg font-bold text-[#F5F5F5]">{formatCurrency(benchmarks.userClaim)}</div>
            <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#00C878] rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((benchmarks.userClaim / 35000) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="text-[11px] text-[#737373] flex justify-between pt-0.5">
              <span>Dataset Avg:</span>
              <span className="text-[#A3A3A3] font-semibold">{formatCurrency(benchmarks.avgClaim)}</span>
            </div>
          </div>

          {/* Vehicle Price Benchmark */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#343434] space-y-2.5">
            <span className="text-xs text-[#A3A3A3] font-medium">Vehicle Market Price</span>
            <div className="text-lg font-bold text-[#F5F5F5]">{formatCurrency(benchmarks.userPrice)}</div>
            <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#8BEF4A] rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((benchmarks.userPrice / 45000) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />
            </div>
            <div className="text-[11px] text-[#737373] flex justify-between pt-0.5">
              <span>Dataset Avg:</span>
              <span className="text-[#A3A3A3] font-semibold">{formatCurrency(benchmarks.avgPrice)}</span>
            </div>
          </div>

          {/* Safety Rating Benchmark */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#343434] space-y-2.5">
            <span className="text-xs text-[#A3A3A3] font-medium">Vehicle Safety Rating</span>
            <div className="text-lg font-bold text-[#F5F5F5]">{benchmarks.userSafety} / 100</div>
            <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#22D3EE] rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${benchmarks.userSafety}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </div>
            <div className="text-[11px] text-[#737373] flex justify-between pt-0.5">
              <span>Dataset Avg:</span>
              <span className="text-[#A3A3A3] font-semibold">{benchmarks.avgSafety} / 100</span>
            </div>
          </div>

          {/* Past Claims History Benchmark */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#343434] space-y-2.5">
            <span className="text-xs text-[#A3A3A3] font-medium">Previous Claims History</span>
            <div className="text-lg font-bold text-[#F5F5F5]">{benchmarks.userPrevClaims} Claims</div>
            <div className="w-full h-2 bg-[#222222] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#F97316] rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((benchmarks.userPrevClaims / 4) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <div className="text-[11px] text-[#737373] flex justify-between pt-0.5">
              <span>Dataset Avg:</span>
              <span className="text-[#A3A3A3] font-semibold">{benchmarks.avgPrevClaims} Claims</span>
            </div>
          </div>

        </div>
      </Card>

      {/* BOTTOM ACTION */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          size="lg"
          icon={RotateCcw}
          onClick={onReset}
          className="min-w-[220px]"
        >
          Evaluate Another Claim
        </Button>
      </div>

    </motion.div>
  );
};

export default PredictionResult;
