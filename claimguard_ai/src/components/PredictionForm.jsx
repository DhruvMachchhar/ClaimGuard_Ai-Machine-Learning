import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Car, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  MapPin,
  FileCheck
} from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

export const PredictionForm = ({ onSubmit, isLoading }) => {
  // Low Risk Preset (Row 0 from actual preprocessed dataset)
  const lowRiskPreset = {
    // Section 1: Driver Information
    age_of_driver: 39,
    gender: 'Male',
    marital_status: 'Married',
    safety_rating: 73,
    annual_income: 58612,
    high_education: 'Yes',
    address_change: 'No',
    property_status: 'Own',
    zip_code: 50048,

    // Section 2: Claim Information
    claim_date: '2023-08-12',
    past_num_of_claims: 0,
    witness_present: 'No',
    liab_prct: 25,
    police_report: 'No',

    // Section 3: Vehicle Information
    vehicle_category: 'Large',
    age_of_vehicle: 8,
    vehicle_price: 24360,

    // Section 4: Financial & Policy Information
    total_claim: 26633,
    injury_claim: 5196,
    policy_deductible: 1000,
    annual_premium: 1406,
    days_open: 9,
    form_defects: 5
  };

  // High Risk Preset (Row 1 from actual preprocessed dataset)
  const highRiskPreset = {
    // Section 1: Driver Information
    age_of_driver: 33,
    gender: 'Male',
    marital_status: 'Married',
    safety_rating: 72,
    annual_income: 35936,
    high_education: 'No',
    address_change: 'Yes',
    property_status: 'Own',
    zip_code: 50006,

    // Section 2: Claim Information
    claim_date: '2024-10-18',
    past_num_of_claims: 0,
    witness_present: 'Yes',
    liab_prct: 45,
    police_report: 'No',

    // Section 3: Vehicle Information
    vehicle_category: 'Medium',
    age_of_vehicle: 2,
    vehicle_price: 23457,

    // Section 4: Financial & Policy Information
    total_claim: 26707,
    injury_claim: 7957,
    policy_deductible: 2000,
    annual_premium: 1415,
    days_open: 10,
    form_defects: 5
  };

  const [formData, setFormData] = useState(lowRiskPreset);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(lowRiskPreset);
  };

  const loadPreset = (preset) => {
    setFormData(preset);
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#343434] text-[#F5F5F5] placeholder-[#737373] text-sm focus:outline-none focus:border-[#00C878] focus:ring-2 focus:ring-[#00C878]/25 transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-[#A3A3A3] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* QUICK PRESET SELECTOR BAR */}
      <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-[#343434] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#00C878] shrink-0" />
          <span className="text-xs font-semibold text-[#F5F5F5]">Verified Notebook Samples:</span>
          <span className="text-xs text-[#A3A3A3] hidden md:inline">Load actual portfolio test records directly into the form</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => loadPreset(lowRiskPreset)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex-1 sm:flex-none text-center cursor-pointer"
          >
            ✓ Row 0 (Not Fraud Sample)
          </button>
          <button
            type="button"
            onClick={() => loadPreset(highRiskPreset)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all flex-1 sm:flex-none text-center cursor-pointer"
          >
            ⚠ Row 1 (Potential Fraud Sample)
          </button>
        </div>
      </div>

      {/* SECTION 1: DRIVER INFORMATION */}
      <Card glass className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#343434]/80 pb-4">
          <div className="p-2.5 rounded-xl bg-[#8BEF4A]/10 text-[#8BEF4A] border border-[#8BEF4A]/30 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">1. Driver Information</h3>
            <p className="text-xs text-[#A3A3A3]">Policyholder demographics, residency, and safety record</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Driver Age */}
          <div>
            <label className={labelClass}>Driver Age (Years)</label>
            <input
              type="number"
              name="age_of_driver"
              value={formData.age_of_driver}
              onChange={handleChange}
              min="16"
              max="100"
              required
              className={inputClass}
            />
          </div>

          {/* Gender */}
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className={labelClass}>Marital Status</label>
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Single">Single / Unmarried</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className={labelClass}>Annual Income ($)</label>
            <input
              type="number"
              name="annual_income"
              value={formData.annual_income}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Higher Education */}
          <div>
            <label className={labelClass}>Higher Education</label>
            <select
              name="high_education"
              value={formData.high_education}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Yes">Yes (College / Degree Completed)</option>
              <option value="No">No (High School / None)</option>
            </select>
          </div>

          {/* Address Change */}
          <div>
            <label className={labelClass}>Recent Address Change (Past 1 yr)</label>
            <select
              name="address_change"
              value={formData.address_change}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="No">No (Same address 1+ year)</option>
              <option value="Yes">Yes (Recent relocation under 1 year)</option>
            </select>
          </div>

          {/* Property Status */}
          <div>
            <label className={labelClass}>Property Status</label>
            <select
              name="property_status"
              value={formData.property_status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Own">Homeowner (Own)</option>
              <option value="Rent">Tenant (Rent)</option>
            </select>
          </div>

          {/* ZIP Code */}
          <div>
            <label className={labelClass}>Postal ZIP Code</label>
            <input
              type="number"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g. 50048"
            />
          </div>

          {/* Driver Safety Rating */}
          <div className="sm:col-span-2 lg:col-span-1 bg-[#141414] p-3 rounded-xl border border-[#343434]">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-[#A3A3A3]">Safety Rating</span>
              <span className="text-[#00C878] font-bold text-xs bg-[#00C878]/10 px-2 py-0.5 rounded-full border border-[#00C878]/30">
                {formData.safety_rating} / 100
              </span>
            </div>
            <input
              type="range"
              name="safety_rating"
              min="0"
              max="100"
              value={formData.safety_rating}
              onChange={handleChange}
              className="w-full h-1.5 rounded-lg cursor-pointer mt-1"
            />
          </div>
        </div>
      </Card>

      {/* SECTION 2: CLAIM INFORMATION */}
      <Card glass className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#343434]/80 pb-4">
          <div className="p-2.5 rounded-xl bg-[#00C878]/10 text-[#00C878] border border-[#00C878]/30 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">2. Claim Information</h3>
            <p className="text-xs text-[#A3A3A3]">Incident timeline, eyewitness presence, and liability factors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Claim Date */}
          <div>
            <label className={labelClass}>Claim Date</label>
            <input
              type="date"
              name="claim_date"
              value={formData.claim_date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Previous Number of Claims */}
          <div>
            <label className={labelClass}>Previous Number of Claims</label>
            <input
              type="number"
              name="past_num_of_claims"
              value={formData.past_num_of_claims}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Witness Present */}
          <div>
            <label className={labelClass}>Eyewitness Present?</label>
            <select
              name="witness_present"
              value={formData.witness_present}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="No">No (No Witnesses Recorded)</option>
              <option value="Yes">Yes (Neutral Witness Available)</option>
            </select>
          </div>

          {/* Liability Percentage */}
          <div>
            <label className={labelClass}>Liability Percentage (%)</label>
            <input
              type="number"
              name="liab_prct"
              value={formData.liab_prct}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className={inputClass}
            />
          </div>

          {/* Police Report */}
          <div>
            <label className={labelClass}>Official Police Report Filed?</label>
            <select
              name="police_report"
              value={formData.police_report}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="No">No (Unreported Incident)</option>
              <option value="Yes">Yes (Filed & Verified)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* SECTION 3: VEHICLE INFORMATION */}
      <Card glass className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#343434]/80 pb-4">
          <div className="p-2.5 rounded-xl bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30 shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">3. Vehicle Information</h3>
            <p className="text-xs text-[#A3A3A3]">Automobile category, market valuation, and age</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Vehicle Category */}
          <div>
            <label className={labelClass}>Vehicle Category</label>
            <select
              name="vehicle_category"
              value={formData.vehicle_category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Compact">Compact (Sedan / Hatchback)</option>
              <option value="Medium">Medium (Mid-size Sedan / Coupe / Sports)</option>
              <option value="Large">Large (SUV / Truck / Van)</option>
            </select>
          </div>

          {/* Vehicle Age */}
          <div>
            <label className={labelClass}>Vehicle Age (Years)</label>
            <input
              type="number"
              name="age_of_vehicle"
              value={formData.age_of_vehicle}
              onChange={handleChange}
              min="0"
              max="40"
              required
              className={inputClass}
            />
          </div>

          {/* Vehicle Price */}
          <div>
            <label className={labelClass}>Vehicle Market Price ($)</label>
            <input
              type="number"
              name="vehicle_price"
              value={formData.vehicle_price}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>
        </div>
      </Card>

      {/* SECTION 4: FINANCIAL / POLICY INFORMATION */}
      <Card glass className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#343434]/80 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">4. Financial & Policy Information</h3>
            <p className="text-xs text-[#A3A3A3]">Claimed amounts, policy deductible, premiums, and defects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Claim */}
          <div>
            <label className={labelClass}>Total Claim Amount ($)</label>
            <input
              type="number"
              name="total_claim"
              value={formData.total_claim}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Injury Claim */}
          <div>
            <label className={labelClass}>Injury Claim Portion ($)</label>
            <input
              type="number"
              name="injury_claim"
              value={formData.injury_claim}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Policy Deductible */}
          <div>
            <label className={labelClass}>Policy Deductible ($)</label>
            <input
              type="number"
              name="policy_deductible"
              value={formData.policy_deductible}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Annual Premium */}
          <div>
            <label className={labelClass}>Annual Premium ($)</label>
            <input
              type="number"
              name="annual_premium"
              value={formData.annual_premium}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Days Open */}
          <div>
            <label className={labelClass}>Claim Processing Days Open</label>
            <input
              type="number"
              name="days_open"
              value={formData.days_open}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          {/* Form Defects */}
          <div>
            <label className={labelClass}>Form Defects Count</label>
            <input
              type="number"
              name="form_defects"
              value={formData.form_defects}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>
        </div>
      </Card>

      {/* FORM ACTIONS */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#222222] rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Form
        </button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto min-w-[220px]"
        >
          {isLoading ? 'Analyzing Claim with Model...' : 'Analyze Claim Risk'}
        </Button>
      </div>

    </form>
  );
};

export default PredictionForm;
