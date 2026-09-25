import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  CheckCircle2, 
  Sliders, 
  Binary, 
  Brain, 
  Gauge, 
  ShieldAlert, 
  HelpCircle, 
  Layers, 
  Sparkles,
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { RiskBadge } from '../components/RiskBadge';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const pipelineSteps = [
    {
      id: 'input',
      number: '01',
      title: 'User Claim Input',
      icon: FileText,
      shortDesc: 'Collects financial amounts, policyholder demographics, and vehicle details.',
      fullDesc: 'The user completes an interactive form providing key parameters such as Claim Amount, Policy Deductible, Driver Age, Safety Rating, Police Report Status, and Incident Location.'
    },
    {
      id: 'validation',
      number: '02',
      title: 'Data Validation',
      icon: CheckCircle2,
      shortDesc: 'Ensures numerical inputs are valid, positive, and non-empty.',
      fullDesc: 'Inputs are checked for basic validity (e.g. positive claim amounts, valid age ranges, non-null values) to prevent bad data from reaching the model.'
    },
    {
      id: 'preprocessing',
      number: '03',
      title: 'Data Preprocessing',
      icon: Sliders,
      shortDesc: 'Encodes categorical text attributes into numerical vectors.',
      fullDesc: 'Categorical attributes (e.g. Gender, Vehicle Category, Accident Site) are converted into standard numerical representations using One-Hot Encoding or Ordinal Encoding.'
    },
    {
      id: 'scaling',
      number: '04',
      title: 'Feature Scaling & Transformation',
      icon: Binary,
      shortDesc: 'Normalizes numerical variables using StandardScaler.',
      fullDesc: 'Numerical values with large variances (such as Vehicle Price or Annual Income) are normalized using StandardScaler so no single attribute artificially dominates model weights.'
    },
    {
      id: 'model',
      number: '05',
      title: 'ML Classification Model',
      icon: Brain,
      shortDesc: 'Supervised classification model trained on scikit-learn.',
      fullDesc: 'The preprocessed feature vector is passed to the trained classification model (such as Random Forest or Logistic Regression) to calculate probability vectors.'
    },
    {
      id: 'probability',
      number: '06',
      title: 'Fraud Probability Calculation',
      icon: Gauge,
      shortDesc: 'Calculates continuous anomaly probability score from 0.0 to 1.0.',
      fullDesc: 'The model outputs a probability value representing the statistical likelihood that the claim contains fraud characteristics.'
    },
    {
      id: 'classification',
      number: '07',
      title: 'Risk Decision & Explainability',
      icon: ShieldAlert,
      shortDesc: 'Maps percentage to LOW, MEDIUM, HIGH, or CRITICAL risk with key factors.',
      fullDesc: 'The final percentage score is mapped into actionable risk categories with clear, human-understandable contributing risk factors for insurance adjusters.'
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        
        {/* Header */}
        <SectionHeader
          badgeText="Machine Learning System Architecture"
          title="How ClaimGuard AI Works"
          subtitle="A transparent technical walkthrough of our end-to-end supervised machine learning vehicle insurance fraud prediction pipeline."
          centered
        />

        {/* SECTION 1: WHAT IS FRAUD & WHY IT MATTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Card glass className="space-y-4 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30 shrink-0">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">What is Vehicle Insurance Fraud?</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Vehicle insurance fraud occurs when policyholders or third parties submit false, exaggerated, or staged claims to receive unwarranted financial payouts from insurance providers.
            </p>
            <ul className="space-y-2 text-xs text-[#E5E5E5] pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] shrink-0" />
                <span>Exaggerated loss or inflated repair bills</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] shrink-0" />
                <span>Staged accidents or fabricated injury claims</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C878] shrink-0" />
                <span>Falsified accident dates or unverified location details</span>
              </li>
            </ul>
          </Card>

          <Card glass className="space-y-4 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#8BEF4A]/10 text-[#8BEF4A] border border-[#8BEF4A]/30 shrink-0">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">Why Automated Detection Matters</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Insurance fraud costs billions of dollars annually, driving up premium costs for honest policyholders. Manual claim auditing is slow, expensive, and subject to human inconsistency.
            </p>
            <ul className="space-y-2 text-xs text-[#E5E5E5] pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8BEF4A] shrink-0" />
                <span>Fast-tracks legitimate claim approvals in milliseconds</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8BEF4A] shrink-0" />
                <span>Flags suspicious high-risk claims for priority investigation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8BEF4A] shrink-0" />
                <span>Provides objective, data-driven risk scoring & explainability</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* SECTION 2: INTERACTIVE PIPELINE STEPS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
              Machine Learning Pipeline Sequence
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3]">
              Select any stage below to inspect data transformation during live model inference.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {pipelineSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#292929] border-[#00C878] shadow-lg shadow-[#00C878]/15 ring-1 ring-[#00C878]'
                      : 'bg-[#1E1E1E] border-[#343434] hover:bg-[#262626] hover:border-[#4A4A4A]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black ${isActive ? 'text-[#00C878]' : 'text-[#737373]'}`}>
                      {step.number}
                    </span>
                    <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[#00C878]' : 'text-[#8E8E8E]'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-[#F5F5F5] font-heading line-clamp-2">
                    {step.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <Card glass className="p-6 sm:p-8 border-[#00C878]/40 bg-[#1A1A1A] relative overflow-hidden shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#343434]/80 pb-4 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30 shrink-0">
                  {React.createElement(pipelineSteps[activeStep].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[11px] text-[#00C878] font-extrabold tracking-widest uppercase">
                    Stage {pipelineSteps[activeStep].number} of 07
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F5]">
                    {pipelineSteps[activeStep].title}
                  </h4>
                </div>
              </div>

              {/* Step navigation buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className="p-2 rounded-lg bg-[#222222] border border-[#343434] text-[#A3A3A3] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(pipelineSteps.length - 1, prev + 1))}
                  disabled={activeStep === pipelineSteps.length - 1}
                  className="p-2 rounded-lg bg-[#222222] border border-[#343434] text-[#A3A3A3] hover:text-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
              {pipelineSteps[activeStep].fullDesc}
            </p>
          </Card>

        </div>

        {/* SECTION 3: RISK LEVEL MATRIX */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">Risk Score Interpretation Matrix</h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3]">
              How ClaimGuard AI translates continuous probability outputs into operational risk decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card hoverEffect className="space-y-3 p-5 sm:p-6 border-emerald-500/30">
              <RiskBadge score={15} />
              <div className="text-xl font-bold font-heading text-[#F5F5F5]">0% – 29%</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Standard legitimate claim pattern. Fast-track automated approval recommended.
              </p>
            </Card>

            <Card hoverEffect className="space-y-3 p-5 sm:p-6 border-amber-500/30">
              <RiskBadge score={45} />
              <div className="text-xl font-bold font-heading text-[#F5F5F5]">30% – 59%</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Minor statistical variations observed. Standard documentation verification recommended.
              </p>
            </Card>

            <Card hoverEffect className="space-y-3 p-5 sm:p-6 border-orange-500/30">
              <RiskBadge score={72} />
              <div className="text-xl font-bold font-heading text-[#F5F5F5]">60% – 79%</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Elevated anomaly indicators detected. Assigned to senior claims adjuster for manual review.
              </p>
            </Card>

            <Card hoverEffect className="space-y-3 p-5 sm:p-6 border-red-500/30">
              <RiskBadge score={90} />
              <div className="text-xl font-bold font-heading text-[#F5F5F5]">80% – 100%</div>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Multiple critical risk drivers present. Flagged for Special Investigation Unit (SIU).
              </p>
            </Card>
          </div>
        </div>

        {/* CTA BOTTOM BANNER */}
        <div className="bg-gradient-to-r from-[#1A1A1A] via-[#222222] to-[#1A1A1A] rounded-2xl p-8 border border-[#343434] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F5]">Test the Prediction Engine Yourself</h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3]">Submit vehicle claim attributes to see the 7-step pipeline calculate anomaly probabilities in real time.</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/predict')}
            className="shrink-0 w-full sm:w-auto"
          >
            Launch Claim Evaluator
          </Button>
        </div>

      </div>
    </PageTransition>
  );
};

export default About;

