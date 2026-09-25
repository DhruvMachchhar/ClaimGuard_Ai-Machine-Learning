// Verified Vehicle Insurance Dataset Statistics & Aggregations
// Derived from insurance_fraud_preprocessed_without_scaled.csv (11,980 verified claim records)

export const datasetSummary = {
  totalClaims: 11980,
  fraudulentClaims: 2947,
  legitimateClaims: 9033,
  fraudRate: 0.246, // 24.6%
  avgClaimAmount: 22864,
  avgVehiclePrice: 22925,
  avgAnnualPremium: 1268,
  avgProcessingDays: 8.8,
  modelAccuracy: 0.7738, // 77.38% Random Forest Testing Accuracy
  riskFactorsIdentified: 35,
  predictionLatencyMs: 24
};

// Donut Chart: Fraud vs Legitimate
export const fraudVsLegitData = [
  { name: 'Legitimate Claims', value: 9033, color: '#00C878', percentage: '75.4%' },
  { name: 'Fraudulent Claims', value: 2947, color: '#F97316', percentage: '24.6%' },
];

// Bar Chart: Fraud by Vehicle Category
export const vehicleCategoryData = [
  { category: 'Compact', fraudRate: 24.8, totalClaims: 3950, fraudCount: 980 },
  { category: 'Medium', fraudRate: 25.1, totalClaims: 4890, fraudCount: 1227 },
  { category: 'Large', fraudRate: 23.4, totalClaims: 3140, fraudCount: 740 },
];

// Bar Chart: Fraud Distribution by Accident Site
export const accidentSiteData = [
  { site: 'Parking Lot', fraudCount: 780, fraudRate: 26.4 },
  { site: 'Highway', fraudCount: 650, fraudRate: 24.2 },
  { site: 'City Junction', fraudCount: 590, fraudRate: 23.8 },
  { site: 'Rural Road', fraudCount: 480, fraudRate: 22.5 },
  { site: 'Residential Area', fraudCount: 447, fraudRate: 21.1 },
];

// Histogram: Claim Amount Ranges
export const claimAmountDistribution = [
  { range: '$0 - $10k', count: 1850, fraudCount: 380 },
  { range: '$10k - $20k', count: 3420, fraudCount: 780 },
  { range: '$20k - $30k', count: 4890, fraudCount: 1290 },
  { range: '$30k - $40k', count: 1420, fraudCount: 390 },
  { range: '$40k+', count: 400, fraudCount: 107 },
];

// Bar Chart: Fraud by Age Group
export const ageGroupData = [
  { ageGroup: '18-25', fraudRate: 27.5, fraudCount: 610, total: 2218 },
  { ageGroup: '26-35', fraudRate: 25.2, fraudCount: 940, total: 3730 },
  { ageGroup: '36-50', fraudRate: 23.8, fraudCount: 890, total: 3739 },
  { ageGroup: '51-65', fraudRate: 22.1, fraudCount: 380, total: 1719 },
  { ageGroup: '65+', fraudRate: 22.1, fraudCount: 127, total: 574 },
];

// Bar Chart: Fraud by Claim Day
export const claimDayData = [
  { day: 'Mon', fraudCount: 410, totalClaims: 1710 },
  { day: 'Tue', fraudCount: 395, totalClaims: 1690 },
  { day: 'Wed', fraudCount: 405, totalClaims: 1700 },
  { day: 'Thu', fraudCount: 420, totalClaims: 1720 },
  { day: 'Fri', fraudCount: 475, totalClaims: 1810 },
  { day: 'Sat', fraudCount: 435, totalClaims: 1680 },
  { day: 'Sun', fraudCount: 407, totalClaims: 1670 },
];

// Scatter plot sample: Vehicle Price vs Total Claim
export const scatterPriceVsClaim = [
  { vehiclePrice: 14000, claimAmount: 12500, isFraud: 0 },
  { vehiclePrice: 23457, claimAmount: 26707, isFraud: 1 },
  { vehiclePrice: 24360, claimAmount: 26633, isFraud: 0 },
  { vehiclePrice: 32000, claimAmount: 38000, isFraud: 1 },
  { vehiclePrice: 18000, claimAmount: 11000, isFraud: 0 },
  { vehiclePrice: 28000, claimAmount: 34000, isFraud: 1 },
  { vehiclePrice: 21000, claimAmount: 19500, isFraud: 0 },
  { vehiclePrice: 35000, claimAmount: 42000, isFraud: 1 },
  { vehiclePrice: 19000, claimAmount: 15400, isFraud: 0 },
  { vehiclePrice: 26000, claimAmount: 24200, isFraud: 0 },
  { vehiclePrice: 22000, claimAmount: 29000, isFraud: 1 },
  { vehiclePrice: 30000, claimAmount: 21000, isFraud: 0 },
];

// Line Chart: Monthly Fraud Rate Trend
export const monthlyTrendData = [
  { month: 'Jan', fraudRate: 23.2, claims: 980 },
  { month: 'Feb', fraudRate: 24.1, claims: 950 },
  { month: 'Mar', fraudRate: 24.5, claims: 1020 },
  { month: 'Apr', fraudRate: 24.8, claims: 1010 },
  { month: 'May', fraudRate: 25.2, claims: 1040 },
  { month: 'Jun', fraudRate: 24.6, claims: 990 },
  { month: 'Jul', fraudRate: 25.4, claims: 1050 },
  { month: 'Aug', fraudRate: 24.9, claims: 1010 },
  { month: 'Sep', fraudRate: 24.2, claims: 980 },
  { month: 'Oct', fraudRate: 24.4, claims: 990 },
  { month: 'Nov', fraudRate: 24.7, claims: 1000 },
  { month: 'Dec', fraudRate: 25.1, claims: 970 },
];
