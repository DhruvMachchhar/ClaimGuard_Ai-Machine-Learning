// Mock Machine Learning Prediction Service for static frontend testing

export const calculateClaimRisk = async (formData) => {
  // Artificial slight delay to simulate ML inference latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  let baseRisk = 12; // Base baseline risk percentage
  const factors = [];

  const totalClaim = parseFloat(formData.totalClaim) || 0;
  const vehiclePrice = parseFloat(formData.vehiclePrice) || 25000;
  const annualIncome = parseFloat(formData.annualIncome) || 50000;
  const previousClaims = parseInt(formData.previousClaims) || 0;
  const safetyRating = parseInt(formData.safetyRating) || 75;

  // 1. Claim ratio relative to vehicle price
  const claimRatio = vehiclePrice > 0 ? (totalClaim / vehiclePrice) : 0;
  if (claimRatio > 0.75) {
    baseRisk += 25;
    factors.push({
      title: 'High Claim to Vehicle Value Ratio',
      impact: 'High (+25%)',
      description: `Claim amount ($${totalClaim.toLocaleString()}) represents ${Math.round(claimRatio * 100)}% of total vehicle market value ($${vehiclePrice.toLocaleString()}).`
    });
  } else if (claimRatio > 0.45) {
    baseRisk += 12;
    factors.push({
      title: 'Moderate Claim to Value Ratio',
      impact: 'Medium (+12%)',
      description: `Claim amount is significant relative to estimated vehicle market price.`
    });
  }

  // 2. Police Report absence
  if (formData.policeReport === 'No') {
    baseRisk += 15;
    factors.push({
      title: 'No Official Police Report',
      impact: 'High (+15%)',
      description: 'Accidents without formal law enforcement report present elevated statistical anomaly rates.'
    });
  }

  // 3. Witness Presence
  if (formData.witnessPresent === 'No') {
    baseRisk += 8;
    factors.push({
      title: 'No Eyewitness Recorded',
      impact: 'Medium (+8%)',
      description: 'Lack of neutral third-party verification recorded at scene.'
    });
  }

  // 4. Previous Claims History
  if (previousClaims >= 3) {
    baseRisk += 22;
    factors.push({
      title: 'Frequent Previous Claims History',
      impact: 'High (+22%)',
      description: `Policyholder has registered ${previousClaims} prior claims within recent observation period.`
    });
  } else if (previousClaims === 2) {
    baseRisk += 10;
    factors.push({
      title: 'Multiple Past Claims',
      impact: 'Medium (+10%)',
      description: 'Policyholder has 2 previous claims filed.'
    });
  }

  // 5. Vehicle Category
  if (['Sports Car', 'Luxury Sedan'].includes(formData.vehicleCategory)) {
    baseRisk += 10;
    factors.push({
      title: 'High Risk Vehicle Classification',
      impact: 'Medium (+10%)',
      description: `${formData.vehicleCategory} categories exhibit higher average claim fraud velocity in dataset.`
    });
  }

  // 6. Low Safety Rating
  if (safetyRating < 60) {
    baseRisk += 12;
    factors.push({
      title: 'Below Average Safety Rating',
      impact: 'Medium (+12%)',
      description: `Vehicle safety score (${safetyRating}/100) indicates increased vulnerability.`
    });
  }

  // 7. Recent Address Change
  if (formData.addressChange === 'Recent (under 1 yr)') {
    baseRisk += 9;
    factors.push({
      title: 'Recent Policyholder Relocation',
      impact: 'Low (+9%)',
      description: 'Address modification within past 12 months flags potential inconsistency.'
    });
  }

  // Cap final score between 5% and 98%
  const finalScorePct = Math.min(Math.max(baseRisk, 6), 96);
  const normalizedScore = finalScorePct / 100;

  // Determine prediction binary label
  const prediction = finalScorePct >= 50 ? 1 : 0;

  let riskLevel = 'Low Risk';
  if (finalScorePct >= 80) riskLevel = 'Critical Risk';
  else if (finalScorePct >= 60) riskLevel = 'High Risk';
  else if (finalScorePct >= 30) riskLevel = 'Medium Risk';

  // If no high risk factors identified, provide standard positive notice
  if (factors.length === 0) {
    factors.push({
      title: 'Standard Claim Profile',
      impact: 'Neutral (0%)',
      description: 'All submitted parameters fall well within normal statistical boundaries for legitimate claims.'
    });
  }

  return {
    prediction,
    risk_score: normalizedScore,
    risk_percentage: finalScorePct,
    risk_level: riskLevel,
    contributing_factors: factors,
    personalized_benchmarks: {
      userClaim: totalClaim,
      avgClaim: 8450,
      userPrice: vehiclePrice,
      avgPrice: 26800,
      userSafety: safetyRating,
      avgSafety: 82,
      userPrevClaims: previousClaims,
      avgPrevClaims: 0.8
    }
  };
};
