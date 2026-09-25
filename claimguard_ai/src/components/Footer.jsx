import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Database, Cpu } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] border-t border-[#2A2A2A] text-[#A3A3A3] text-sm py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="sm:col-span-2 space-y-3.5">
            <Link to="/" className="flex items-center gap-2.5 group focus:outline-none inline-flex">
              <div className="p-1.5 rounded-lg bg-[#00C878]/10 border border-[#00C878]/30 group-hover:border-[#00C878]/60 transition-colors">
                <Shield className="w-4 h-4 text-[#00C878]" />
              </div>
              <span className="text-lg font-bold font-heading text-[#F5F5F5] group-hover:text-[#00C878] transition-colors">
                ClaimGuard<span className="text-[#00C878]">.AI</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#8E8E8E] max-w-md leading-relaxed">
              AI-powered vehicle insurance fraud risk analysis platform. Built with supervised machine learning classification algorithms to estimate claim anomaly probability in real time.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-[#8E8E8E] hover:text-[#00C878] transition-colors inline-block py-0.5">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#8E8E8E] hover:text-[#00C878] transition-colors inline-block py-0.5">How It Works</Link>
              </li>
              <li>
                <Link to="/analytics" className="text-[#8E8E8E] hover:text-[#00C878] transition-colors inline-block py-0.5">Analytics Dashboard</Link>
              </li>
              <li>
                <Link to="/predict" className="text-[#8E8E8E] hover:text-[#00C878] transition-colors inline-block py-0.5">Predict Claim</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F5F5F5] uppercase tracking-wider font-heading">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-[#7A7A7A]">
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#00C878] shrink-0" />
                <span>Frontend: React + Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#8BEF4A] shrink-0" />
                <span>ML Pipeline: Scikit-learn</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                <span>Charts: Interactive Recharts</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} ClaimGuard AI. Academic Machine Learning Project.</p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#333333]">
            <span className="w-2 h-2 rounded-full bg-[#00C878] animate-pulse"></span>
            <span className="text-[#A3A3A3] font-medium">Inference Engine Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

