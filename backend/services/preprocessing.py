import pandas as pd
import numpy as np
from typing import Dict, Any, List
from utils.validation import parse_binary_feature, parse_claim_date, normalize_vehicle_category

def preprocess_claim_input(input_data: Dict[str, Any], feature_names: List[str], scale_columns: List[str], scaler) -> pd.DataFrame:
    """
    Transforms user input dictionary into a preprocessed and scaled DataFrame
    matching the exact feature structure, order, and scaling used during model training.
    """
    # 1. Parse date features
    claim_date_str = str(input_data.get("claim_date", input_data.get("claimDate", "2024-01-01")))
    claim_day, claim_month, claim_year, is_weekend, day_of_week = parse_claim_date(claim_date_str)

    # 2. Parse vehicle classification
    raw_cat = str(input_data.get("vehicle_category", input_data.get("vehicleCategory", "Medium")))
    veh_cat = normalize_vehicle_category(raw_cat)

    # 3. Parse binary / categorical fields
    gender_val = parse_binary_feature(input_data.get("gender", 1))
    marital_status_val = parse_binary_feature(input_data.get("marital_status", input_data.get("maritalStatus", 1)))
    high_education_val = parse_binary_feature(input_data.get("high_education", input_data.get("highEducation", input_data.get("education", 1))))
    address_change_val = parse_binary_feature(input_data.get("address_change", input_data.get("addressChange", 0)))
    property_status_val = parse_binary_feature(input_data.get("property_status", input_data.get("propertyStatus", 0)))
    witness_present_val = parse_binary_feature(input_data.get("witness_present", input_data.get("witnessPresent", 0)))
    police_report_val = parse_binary_feature(input_data.get("police_report", input_data.get("policeReport", 0)))

    # 4. Parse numerical fields
    zip_code_val = float(str(input_data.get("zip_code", input_data.get("zipCode", 50000))).strip() or 50000)
    
    row_dict = {
        "age_of_driver": float(input_data.get("age_of_driver", input_data.get("driverAge", 35))),
        "gender": int(gender_val),
        "marital_status": int(marital_status_val),
        "safety_rating": float(input_data.get("safety_rating", input_data.get("safetyRating", 75))),
        "annual_income": float(input_data.get("annual_income", input_data.get("annualIncome", 50000))),
        "high_education": int(high_education_val),
        "address_change": int(address_change_val),
        "property_status": int(property_status_val),
        "zip_code": zip_code_val,
        "past_num_of_claims": float(input_data.get("past_num_of_claims", input_data.get("pastNumOfClaims", input_data.get("previousClaims", 0)))),
        "witness_present": int(witness_present_val),
        "liab_prct": float(input_data.get("liab_prct", input_data.get("liabPrct", input_data.get("liabilityPercentage", 30)))),
        "police_report": int(police_report_val),
        "age_of_vehicle": float(input_data.get("age_of_vehicle", input_data.get("ageOfVehicle", input_data.get("vehicleAge", 5)))),
        "vehicle_price": float(input_data.get("vehicle_price", input_data.get("vehiclePrice", 25000))),
        "total_claim": float(input_data.get("total_claim", input_data.get("totalClaim", 10000))),
        "injury_claim": float(input_data.get("injury_claim", input_data.get("injuryClaim", 2000))),
        "policy deductible": float(input_data.get("policy_deductible", input_data.get("policyDeductible", 500))),
        "annual premium": float(input_data.get("annual_premium", input_data.get("annualPremium", 1200))),
        "days open": float(input_data.get("days_open", input_data.get("daysOpen", 10))),
        "form defects": float(input_data.get("form_defects", input_data.get("formDefects", 0))),
        "claim_day": float(claim_day),
        "claim_month": float(claim_month),
        "claim_year": float(claim_year),
        "is_weekend": int(is_weekend),
        
        # Day of week one-hot encoding
        "claim_day_of_week_Friday": 1 if day_of_week == "Friday" else 0,
        "claim_day_of_week_Monday": 1 if day_of_week == "Monday" else 0,
        "claim_day_of_week_Saturday": 1 if day_of_week == "Saturday" else 0,
        "claim_day_of_week_Sunday": 1 if day_of_week == "Sunday" else 0,
        "claim_day_of_week_Thursday": 1 if day_of_week == "Thursday" else 0,
        "claim_day_of_week_Tuesday": 1 if day_of_week == "Tuesday" else 0,
        "claim_day_of_week_Wednesday": 1 if day_of_week == "Wednesday" else 0,
        
        # Vehicle category one-hot encoding
        "vehicle_category_Compact": 1 if veh_cat == "Compact" else 0,
        "vehicle_category_Large": 1 if veh_cat == "Large" else 0,
        "vehicle_category_Medium": 1 if veh_cat == "Medium" else 0,
    }

    # 5. Build DataFrame with exactly the model's feature names and order
    df = pd.DataFrame([row_dict])[feature_names]

    # 6. Apply pre-fitted scaler to the designated scale columns
    if scaler is not None and scale_columns:
        df_scaled = df.copy()
        df_scaled[scale_columns] = scaler.transform(df[scale_columns])
        return df_scaled

    return df
