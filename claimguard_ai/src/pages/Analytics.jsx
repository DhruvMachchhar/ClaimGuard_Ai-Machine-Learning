import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, 
  Line, AreaChart, Area, ScatterChart, Scatter,
  ComposedChart
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Car, 
  ShieldAlert, 
  Activity, 
  Sparkles,
  Award,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Brain
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';
import { 
  datasetSummary, 
  fraudVsLegitData, 
  vehicleCategoryData, 
  accidentSiteData, 
  claimAmountDistribution, 
  ageGroupData, 
  monthlyTrendData,
  scatterPriceVsClaim
} from '../services/mockAnalyticsData';
import { fetchModelAnalytics } from '../services/apiService';

// Custom Dark Glassmorphism Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#181818]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#343434] shadow-2xl text-xs space-y-1.5 z-50 pointer-events-none">
        {label && <p className="font-bold text-[#F5F5F5] pb-1 border-b border-[#2D2D2D]">{label}</p>}
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill || '#00C878' }} />
              <span className="text-[#A3A3A3] font-medium">{entry.name}:</span>
            </div>
            <span className="text-[#F5F5F5] font-bold">
              {typeof entry.value === 'number' 
                ? (entry.name && entry.name.toLowerCase().includes('rate') ? `${entry.value}%` : entry.value.toLocaleString()) 
                : entry.value}
              {entry.unit || ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePieIndex, setActivePieIndex] = useState(null);
  const [modelMetrics, setModelMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchModelAnalytics();
        setModelMetrics(data);
      } catch (err) {
        console.error('Error fetching model analytics:', err);
      }
    };
    loadMetrics();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview & Distribution', icon: PieIcon },
    { id: 'risk_drivers', label: 'Risk Factors & Demographics', icon: ShieldAlert },
    { id: 'financials', label: 'Financials & Time Trends', icon: TrendingUp },
    { id: 'correlation', label: 'Price vs Claim Scatter', icon: BarChart3 },
  ];

  const metrics = modelMetrics || {
    accuracy: 0.7738,
    precision: 0.7831,
    recall: 0.1104,
    f1_score: 0.1935,
    training_accuracy: 0.7823,
    testing_accuracy: 0.7738,
    accuracy_gap: 0.0086,
    training_samples: 9584,
    testing_samples: 2396,
    total_samples: 11980,
    confusion_matrix: [
      [1789, 18],
      [524, 65]
    ],
    confusion_matrix_breakdown: {
      true_negative: 1789,
      false_positive: 18,
      false_negative: 524,
      true_positive: 65
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
        
        {/* Header */}
        <SectionHeader
          badgeText="Vehicle Insurance Dataset & Model Analytics"
          title="Dataset Insights & Model Performance"
          subtitle="Explore baseline statistical metrics, fraud distribution patterns across 11,980 historical claim records, and verified Random Forest performance evaluation."
        />

        {/* SUMMARY METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            icon={ShieldAlert}
            title="Total Claims / Fraud Rate"
            value={formatNumber(datasetSummary.totalClaims)}
            subtext={`${formatNumber(datasetSummary.fraudulentClaims)} Flagged (${formatPercent(datasetSummary.fraudRate)})`}
            accentColor="#F97316"
          />
          <StatCard
            icon={DollarSign}
            title="Average Claim Amount"
            value={formatCurrency(datasetSummary.avgClaimAmount)}
            subtext="Portfolio average claim payout"
            accentColor="#00C878"
          />
          <StatCard
            icon={Car}
            title="Avg Vehicle Market Price"
            value={formatCurrency(datasetSummary.avgVehiclePrice)}
            subtext="Mean portfolio automobile value"
            accentColor="#8BEF4A"
          />
          <StatCard
            icon={Calendar}
            title="Avg Processing Timeline"
            value={`${datasetSummary.avgProcessingDays} Days`}
            subtext="Time from filing to settlement"
            accentColor="#22D3EE"
          />
        </div>

        {/* INTERACTIVE TAB SWITCHER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2A2A] pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#00C878] text-[#141414] shadow-md shadow-[#00C878]/20 font-bold'
                      : 'bg-[#1E1E1E] text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#262626] border border-[#343434]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#737373]">
            <Sparkles className="w-3.5 h-3.5 text-[#00C878]" />
            <span>Interactive Data Visualization Engine</span>
          </div>
        </div>

        {/* TAB CONTENT 1: OVERVIEW & DISTRIBUTION */}
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Chart 1: Donut Chart with Interactive Segments */}
            <Card glass className="lg:col-span-5 space-y-4 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Fraud vs Legitimate Proportion</h3>
                  <p className="text-xs text-[#A3A3A3]">Hover slices for instant breakdown</p>
                </div>
                <div className="p-2 rounded-lg bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30">
                  <PieIcon className="w-4 h-4" />
                </div>
              </div>

              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fraudVsLegitData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                      onMouseLeave={() => setActivePieIndex(null)}
                    >
                      {fraudVsLegitData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="#141414" 
                          strokeWidth={activePieIndex === index ? 4 : 2}
                          className="transition-all duration-200 cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black font-heading text-[#F5F5F5]">11.9k</span>
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold tracking-wider">Claims</span>
                </div>
              </div>

              {/* Dynamic Legend */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {fraudVsLegitData.map((item, idx) => (
                  <div 
                    key={item.name} 
                    className={`p-3 rounded-xl border transition-all ${
                      activePieIndex === idx 
                        ? 'bg-[#292929] border-[#00C878]/50 shadow-md' 
                        : 'bg-[#141414] border-[#343434]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#A3A3A3] truncate">{item.name}</span>
                    </div>
                    <div className="text-sm font-bold text-[#F5F5F5] font-heading">{formatNumber(item.value)} <span className="text-xs text-[#737373]">({item.percentage})</span></div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chart 2: Composed Chart - Claims Volume & Fraud Rate % by Category */}
            <Card glass className="lg:col-span-7 space-y-4 p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Vehicle Category Risk Analysis</h3>
                  <p className="text-xs text-[#A3A3A3]">Total claim volume (Bar) vs Fraud rate % (Line)</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#00C878] bg-[#00C878]/10 px-2.5 py-1 rounded-full border border-[#00C878]/30 self-start sm:self-auto">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Model Category Analysis</span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={vehicleCategoryData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis dataKey="category" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#00C878" fontSize={11} unit="%" tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar yAxisId="left" dataKey="totalClaims" name="Total Claims" fill="#292929" radius={[6, 6, 0, 0]} />
                    <Bar yAxisId="left" dataKey="fraudCount" name="Fraud Cases" fill="#F97316" radius={[6, 6, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="fraudRate" name="Fraud Rate (%)" stroke="#00C878" strokeWidth={3} dot={{ fill: '#00C878', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB CONTENT 2: RISK DRIVERS & DEMOGRAPHICS */}
        {activeTab === 'risk_drivers' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Chart 3: Accident Site Distribution */}
            <Card glass className="space-y-4 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Accident Location Anomaly Count</h3>
                  <p className="text-xs text-[#A3A3A3]">Fraud cases categorized by incident site</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accidentSiteData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis dataKey="site" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="fraudCount" name="Fraudulent Claims" fill="#F97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Chart 4: Age Group Distribution */}
            <Card glass className="space-y-4 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Fraud Rate % by Driver Age Bracket</h3>
                  <p className="text-xs text-[#A3A3A3]">Risk distribution across policyholder ages</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-[#8BEF4A] border border-[#8BEF4A]/30">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageGroupData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis dataKey="ageGroup" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8E8E8E" fontSize={11} unit="%" tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="fraudRate" name="Fraud Rate (%)" fill="#8BEF4A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB CONTENT 3: FINANCIALS & TIME TRENDS */}
        {activeTab === 'financials' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Chart 5: Claim Amount Bracket Distribution */}
            <Card glass className="space-y-4 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Claim Amount Bracket Distribution</h3>
                  <p className="text-xs text-[#A3A3A3]">Comparing total volume vs fraud occurrences</p>
                </div>
                <div className="p-2 rounded-lg bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={claimAmountDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis dataKey="range" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="count" name="Total Claims" fill="#00C878" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="fraudCount" name="Fraudulent Claims" fill="#F97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Chart 6: Monthly Fraud Rate Trend AreaChart */}
            <Card glass className="space-y-4 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">Monthly Fraud Rate % Area Trend</h3>
                  <p className="text-xs text-[#A3A3A3]">12-month historical fraud rate trajectory</p>
                </div>
                <div className="p-2 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="fraudRateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                    <XAxis dataKey="month" stroke="#8E8E8E" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8E8E8E" fontSize={11} unit="%" domain={[20, 30]} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="fraudRate" 
                      name="Fraud Rate (%)" 
                      stroke="#22D3EE" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#fraudRateGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* TAB CONTENT 4: PRICE VS CLAIM SCATTER CORRELATION */}
        {activeTab === 'correlation' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card glass className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#343434]/80 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F5]">
                    Vehicle Market Value vs Total Claim Amount Correlation
                  </h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Scatter distribution showing how high claim-to-value ratios cluster into fraud anomalies.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00C878]" />
                    <span className="text-[#A3A3A3]">Legitimate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="text-[#A3A3A3]">Fraudulent</span>
                  </div>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                    <XAxis 
                      type="number" 
                      dataKey="vehiclePrice" 
                      name="Vehicle Price" 
                      unit="$" 
                      stroke="#8E8E8E" 
                      fontSize={11}
                      tickFormatter={(val) => `$${val / 1000}k`}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="claimAmount" 
                      name="Claim Amount" 
                      unit="$" 
                      stroke="#8E8E8E" 
                      fontSize={11}
                      tickFormatter={(val) => `$${val / 1000}k`}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const isFraud = data.isFraud === 1;
                          return (
                            <div className="bg-[#181818]/95 backdrop-blur-md p-3 rounded-xl border border-[#343434] shadow-xl text-xs space-y-1">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                isFraud ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              }`}>
                                {isFraud ? 'Fraudulent Case' : 'Legitimate Case'}
                              </span>
                              <p className="text-[#A3A3A3]">Vehicle Price: <span className="font-bold text-[#F5F5F5]">{formatCurrency(data.vehiclePrice)}</span></p>
                              <p className="text-[#A3A3A3]">Claim Amount: <span className="font-bold text-[#F5F5F5]">{formatCurrency(data.claimAmount)}</span></p>
                              <p className="text-[#737373]">Ratio: {Math.round((data.claimAmount / data.vehiclePrice) * 100)}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      name="Legitimate Claims" 
                      data={scatterPriceVsClaim.filter((d) => d.isFraud === 0)} 
                      fill="#00C878" 
                    />
                    <Scatter 
                      name="Fraudulent Claims" 
                      data={scatterPriceVsClaim.filter((d) => d.isFraud === 1)} 
                      fill="#EF4444" 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 17 REQUIRED SECTION: MODEL PERFORMANCE & CONFUSION MATRIX */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#343434] pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30">
                <Brain className="w-3.5 h-3.5" />
                <span>Authoritative ML Model Evaluation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#F5F5F5] tracking-tight">
                Model Performance & Confusion Matrix
              </h2>
              <p className="text-xs sm:text-sm text-[#A3A3A3]">
                Verified performance metrics and test-set confusion matrix from <code className="text-[#00C878] bg-[#141414] px-1.5 py-0.5 rounded">Model-Creation.ipynb</code> (Trained Random Forest Classifier).
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8E8E8E] bg-[#1A1A1A] px-3.5 py-2 rounded-xl border border-[#343434] self-start sm:self-auto shadow-sm">
              <Cpu className="w-4 h-4 text-[#8BEF4A]" />
              <span>500 Trees • Max Depth 7 • Stratified 80/20</span>
            </div>
          </div>

          {/* 6 Key Model Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">Test Accuracy</span>
              <div className="text-2xl font-black font-heading text-[#00C878]">
                {(metrics.testing_accuracy * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">Overall Test Set</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">Precision</span>
              <div className="text-2xl font-black font-heading text-[#22D3EE]">
                {(metrics.precision * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">True Positive Ratio</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">Recall</span>
              <div className="text-2xl font-black font-heading text-[#F97316]">
                {(metrics.recall * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">Fraud Detection Rate</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">F1 Score</span>
              <div className="text-2xl font-black font-heading text-[#8BEF4A]">
                {(metrics.f1_score * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">Harmonic Mean</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">Train Accuracy</span>
              <div className="text-2xl font-black font-heading text-[#F5F5F5]">
                {(metrics.training_accuracy * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">9,584 Train Records</span>
            </div>

            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#343434] space-y-1">
              <span className="text-[11px] font-semibold text-[#A3A3A3] uppercase tracking-wider">Accuracy Gap</span>
              <div className="text-2xl font-black font-heading text-emerald-400">
                {(metrics.accuracy_gap * 100).toFixed(2)}%
              </div>
              <span className="text-[10px] text-[#737373]">Low Overfitting (&lt;1%)</span>
            </div>
          </div>

          {/* Confusion Matrix and Test Set Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Confusion Matrix Visualization Card */}
            <Card glass className="lg:col-span-7 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-[#343434]/80 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">
                    Confusion Matrix (2,396 Test Samples)
                  </h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Evaluated on 20% stratified holdout test split
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30">
                  Stratified Split
                </div>
              </div>

              {/* 2x2 Matrix Table */}
              <div className="overflow-x-auto">
                <div className="min-w-[420px] space-y-2">
                  <div className="grid grid-cols-3 text-center text-xs font-semibold text-[#8E8E8E] pb-1">
                    <div className="text-left pl-2">Actual \ Predicted</div>
                    <div>Predicted Legitimate (0)</div>
                    <div>Predicted Fraud (1)</div>
                  </div>

                  {/* Actual Negative Row */}
                  <div className="grid grid-cols-3 gap-2.5 items-stretch">
                    <div className="flex items-center text-xs font-bold text-[#A3A3A3] bg-[#141414] px-3 py-2.5 rounded-xl border border-[#343434]">
                      Actual Legitimate (0)
                    </div>
                    {/* True Negative */}
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">True Negative (TN)</span>
                      <div className="text-2xl font-black font-heading text-[#F5F5F5]">{metrics.confusion_matrix[0][0].toLocaleString()}</div>
                      <span className="text-[10px] text-emerald-400/90 font-medium">99.0% Correctly Cleared</span>
                    </div>
                    {/* False Positive */}
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">False Positive (FP)</span>
                      <div className="text-2xl font-black font-heading text-[#F5F5F5]">{metrics.confusion_matrix[0][1].toLocaleString()}</div>
                      <span className="text-[10px] text-red-400/90 font-medium">1.0% False Alarms</span>
                    </div>
                  </div>

                  {/* Actual Positive Row */}
                  <div className="grid grid-cols-3 gap-2.5 items-stretch">
                    <div className="flex items-center text-xs font-bold text-[#A3A3A3] bg-[#141414] px-3 py-2.5 rounded-xl border border-[#343434]">
                      Actual Fraud (1)
                    </div>
                    {/* False Negative */}
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">False Negative (FN)</span>
                      <div className="text-2xl font-black font-heading text-[#F5F5F5]">{metrics.confusion_matrix[1][0].toLocaleString()}</div>
                      <span className="text-[10px] text-amber-400/90 font-medium">Missed Fraud Claims</span>
                    </div>
                    {/* True Positive */}
                    <div className="p-4 rounded-xl bg-[#00C878]/15 border border-[#00C878]/50 text-center space-y-1 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-[#00C878] tracking-wider">True Positive (TP)</span>
                      <div className="text-2xl font-black font-heading text-[#F5F5F5]">{metrics.confusion_matrix[1][1].toLocaleString()}</div>
                      <span className="text-[10px] text-[#00C878] font-medium">Correctly Flagged</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Evaluation Insights Card */}
            <Card glass className="lg:col-span-5 p-6 sm:p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F5F5F5]">
                  <Award className="w-4 h-4 text-[#00C878]" />
                  <span>Evaluation Takeaways</span>
                </div>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  The model demonstrates very high specificity, producing only <strong className="text-emerald-400">18 false positives</strong> out of 1,807 legitimate claims (<strong className="text-emerald-400">99.0% precision on legitimate claims</strong>), ensuring valid customer claims are almost never unjustly blocked.
                </p>
                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#343434] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E8E8E]">Total Clean Dataset:</span>
                    <span className="font-bold text-[#F5F5F5]">11,980 Records</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E8E8E]">Training Partition (80%):</span>
                    <span className="font-bold text-[#F5F5F5]">9,584 Records</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E8E8E]">Testing Partition (20%):</span>
                    <span className="font-bold text-[#F5F5F5]">2,396 Records</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E8E8E]">Algorithm:</span>
                    <span className="font-bold text-[#00C878]">RandomForestClassifier</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#737373]">
                * Source: <span className="text-[#A3A3A3]">Model-Creation.ipynb</span> execution run using scikit-learn 1.7.2.
              </div>
            </Card>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Analytics;
