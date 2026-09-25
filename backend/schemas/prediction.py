from typing import List, Optional, Union, Dict, Any
from pydantic import BaseModel, Field, field_validator

class ClaimPredictionInput(BaseModel):
    # Driver Information
    age_of_driver: int = Field(..., ge=16, le=105, description="Driver age between 16 and 105")
    gender: Union[str, int] = Field(..., description="Gender: Male/Female, M/F, or 1/0")
    marital_status: Union[str, int] = Field(..., description="Marital status: Married/Single or 1/0")
    safety_rating: float = Field(..., ge=0, le=100, description="Driver safety rating between 0 and 100")
    annual_income: float = Field(..., ge=0, description="Annual income (non-negative)")
    high_education: Union[str, int] = Field(..., description="Higher education degree: Yes/No, 1/0, or education level")
    address_change: Union[str, int] = Field(..., description="Address change within past year: Yes/No or 1/0")
    property_status: Union[str, int] = Field(..., description="Property status: Own/Rent or 0/1")
    zip_code: Union[int, str] = Field(..., description="Numeric postal zip code")

    # Claim Information
    claim_date: str = Field(..., description="Claim filing date in YYYY-MM-DD format")
    past_num_of_claims: int = Field(..., ge=0, description="Number of past claims (>= 0)")
    witness_present: Union[str, int] = Field(..., description="Eyewitness present at incident: Yes/No or 1/0")
    liab_prct: float = Field(..., ge=0, le=100, description="Liability percentage between 0 and 100")
    police_report: Union[str, int] = Field(..., description="Official police report filed: Yes/No or 1/0")

    # Vehicle Information
    age_of_vehicle: int = Field(..., ge=0, le=50, description="Age of vehicle in years")
    vehicle_category: str = Field(..., description="Vehicle category: Compact, Medium, or Large")
    vehicle_price: float = Field(..., ge=0, description="Vehicle estimated market value")

    # Financial / Policy Information
    total_claim: float = Field(..., ge=0, description="Total claim amount ($)")
    injury_claim: float = Field(..., ge=0, description="Injury portion of claim ($)")
    policy_deductible: float = Field(..., ge=0, description="Policy deductible ($)")
    annual_premium: float = Field(..., ge=0, description="Annual insurance premium ($)")
    days_open: float = Field(..., ge=0, description="Days claim was open / processing days")
    form_defects: int = Field(..., ge=0, description="Number of defect fields identified in submission form")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "age_of_driver": 33,
                "gender": "Male",
                "marital_status": "Married",
                "safety_rating": 72,
                "annual_income": 35936.0,
                "high_education": "No",
                "address_change": "Yes",
                "property_status": "Own",
                "zip_code": 50006,
                "claim_date": "2024-10-18",
                "past_num_of_claims": 0,
                "witness_present": "Yes",
                "liab_prct": 45,
                "police_report": "No",
                "age_of_vehicle": 2,
                "vehicle_category": "Medium",
                "vehicle_price": 23457.0,
                "total_claim": 26707.0,
                "injury_claim": 7957.0,
                "policy_deductible": 2000,
                "annual_premium": 1415.74,
                "days_open": 10.0,
                "form_defects": 5
            }
        }

class ContributingFactor(BaseModel):
    title: str
    impact: str
    description: str

class PersonalizedBenchmarks(BaseModel):
    userClaim: float
    avgClaim: float
    userPrice: float
    avgPrice: float
    userSafety: float
    avgSafety: float
    userPrevClaims: float
    avgPrevClaims: float

class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="0 for Not Fraud, 1 for Potential Fraud")
    result: str = Field(..., description="Result label: 'Not Fraud' or 'Potential Fraud'")
    probability: float = Field(..., description="Predicted fraud probability (0.0 to 1.0)")
    risk_percentage: float = Field(..., description="Fraud risk as percentage (0 to 100)")
    risk_level: str = Field(..., description="Low, Medium, High, or Critical Risk")
    explanation: str = Field(..., description="Clear contextual interpretation")
    contributing_factors: List[ContributingFactor] = Field(default_factory=list)
    personalized_benchmarks: PersonalizedBenchmarks
    inference_time_ms: float

class ModelAnalyticsResponse(BaseModel):
    model_name: str
    algorithm: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    training_accuracy: float
    testing_accuracy: float
    accuracy_gap: float
    training_samples: int
    testing_samples: int
    total_samples: int
    confusion_matrix: List[List[int]]
    confusion_matrix_breakdown: Dict[str, int]

class ModelInfoResponse(BaseModel):
    model: str
    algorithm: str
    n_estimators: int
    max_depth: Optional[int]
    min_samples_split: int
    min_samples_leaf: int
    max_features: str
    max_samples: Optional[float]
    class_weight: Dict[int, int]
    random_state: int
    total_features: int
    feature_names: List[str]
    scaled_feature_names: List[str]
    training_samples: int
    testing_samples: int

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_name: str
    features_count: int
