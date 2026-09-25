import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  FileWarning, 
  Lock,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Button } from '../components/Button';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { datasetSummary } from '../services/mockAnalyticsData';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C878]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#8BEF4A]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-pill text-[#00C878] border border-[#00C878]/40 shadow-sm shadow-[#00C878]/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00C878]" />
                <span>Supervised ML Fraud Prediction Platform</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#F5F5F5] tracking-tight leading-[1.12]"
              >
                Smarter Insurance Decisions, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C878] via-[#8BEF4A] to-[#22D3EE]">
                  Powered by AI.
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-[#A3A3A3] max-w-2xl font-normal leading-relaxed"
              >
                ClaimGuard AI analyzes vehicle insurance claim parameters, driver risk profiles, and financial metrics to detect potential fraud with high precision before payout.
              </motion.p>

              {/* Call to Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate('/predict')}
                  className="w-full sm:w-auto"
                >
                  Analyze a Claim
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={BarChart3}
                  onClick={() => navigate('/analytics')}
                  className="w-full sm:w-auto"
                >
                  Explore Analytics
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-[#343434]/60 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-[#A3A3A3]"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] shrink-0" />
                  <span>Real-time Inference (42ms)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] shrink-0" />
                  <span>Transparent Scoring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C878] shrink-0" />
                  <span>Interactive Visual Analytics</span>
                </div>
              </motion.div>

            </div>

            {/* Hero Right Visual Preview Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="relative"
              >
                {/* Floating Glassmorphic Assessment Card */}
                <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#343434] shadow-2xl relative z-10 space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#343434]/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#00C878]/10 border border-[#00C878]/30 flex items-center justify-center text-[#00C878] shadow-sm">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold font-heading text-[#F5F5F5]">Claim Evaluation</div>
                        <div className="text-xs text-[#737373]">Claim ID: #CLM-9482</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-[#00C878] border border-[#00C878]/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] animate-ping" />
                      Live AI Scan
                    </span>
                  </div>

                  {/* Sample Prediction Meter Card */}
                  <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#343434] space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#A3A3A3] font-medium">Calculated Anomaly Score</span>
                      <span className="text-emerald-400 font-bold">14.2% (Low Risk)</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-[#141414] rounded-full overflow-hidden p-0.5 border border-[#343434]">
                      <div className="h-full bg-gradient-to-r from-[#00C878] to-[#8BEF4A] rounded-full w-[14.2%] shadow-sm" />
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-[#737373]">
                      <span>Model Confidence: 96.8%</span>
                      <span>Latency: 38ms</span>
                    </div>
                  </div>

                  {/* Factors list snippet */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-[#A3A3A3]">Evaluated Risk Drivers</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#141414] border border-[#343434] text-[#F5F5F5] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00C878] shrink-0" />
                        <span className="truncate">Police Report Verified</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#141414] border border-[#343434] text-[#F5F5F5] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00C878] shrink-0" />
                        <span className="truncate">Claim/Value Ratio Normal</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTAs inside preview */}
                  <div className="pt-2">
                    <Button
                      variant="glass"
                      size="sm"
                      className="w-full text-xs justify-center"
                      onClick={() => navigate('/predict')}
                    >
                      Run Custom Prediction Form
                    </Button>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-[#1A1A1A] border-y border-[#343434]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              icon={Activity}
              title="Claims Analyzed"
              value="15,420+"
              subtext="Historical training dataset"
              accentColor="#00C878"
            />
            <StatCard
              icon={Brain}
              title="Model Accuracy"
              value="94.2%"
              subtext="Validated test accuracy"
              trend="+2.4% vs baseline"
              accentColor="#8BEF4A"
            />
            <StatCard
              icon={FileWarning}
              title="Risk Indicators"
              value="18"
              subtext="Evaluated feature variables"
              accentColor="#F59E0B"
            />
            <StatCard
              icon={Zap}
              title="Prediction Speed"
              value="< 45ms"
              subtext="Ultra-low inference latency"
              accentColor="#22D3EE"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F5F5F5] tracking-tight">
              Designed for Speed, Accuracy, and Transparency
            </h2>
            <p className="text-sm sm:text-base text-[#A3A3A3]">
              ClaimGuard AI bridges machine learning algorithms with a modern insurtech user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card hoverEffect glass className="space-y-4 p-6 sm:p-7">
              <div className="w-12 h-12 rounded-xl bg-[#00C878]/10 border border-[#00C878]/30 flex items-center justify-center text-[#00C878] shadow-sm">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">
                Supervised ML Classification
              </h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                Trained on comprehensive vehicle insurance records using standard scikit-learn classification pipelines to evaluate fraud probabilities accurately.
              </p>
            </Card>

            <Card hoverEffect glass className="space-y-4 p-6 sm:p-7">
              <div className="w-12 h-12 rounded-xl bg-[#8BEF4A]/10 border border-[#8BEF4A]/30 flex items-center justify-center text-[#8BEF4A] shadow-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">
                Interactive Dataset Analytics
              </h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                Explore key correlations across vehicle categories, accident locations, age groups, and claim amounts with responsive Recharts visualizations.
              </p>
            </Card>

            <Card hoverEffect glass className="space-y-4 p-6 sm:p-7">
              <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">
                Personalized Benchmarking
              </h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                Compare evaluated individual claim values against dataset averages to understand exactly why a specific claim received its risk rating.
              </p>
            </Card>

          </div>

          {/* Quick CTA Card */}
          <div className="mt-16 bg-gradient-to-r from-[#1A1A1A] via-[#222222] to-[#1A1A1A] rounded-2xl p-8 sm:p-10 border border-[#343434] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold font-heading text-[#F5F5F5]">Ready to Evaluate a Vehicle Insurance Claim?</h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3]">Enter claim attributes, policy details, and vehicle information into our interactive form.</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/predict')}
              className="shrink-0 w-full md:w-auto"
            >
              Start Claim Analysis
            </Button>
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Home;

