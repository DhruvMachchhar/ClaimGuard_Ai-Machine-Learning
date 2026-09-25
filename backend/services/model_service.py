import os
import time
import joblib
from typing import Dict, Any, Tuple
from schemas.prediction import (
    PredictionResponse,
    ContributingFactor,
    PersonalizedBenchmarks,
    ModelInfoResponse
)
from services.preprocessing import preprocess_claim_input

class ModelService:
    _instance = None

    def __init__(self):
        self.model = None
        self.scaler = None
        self.features = []
        self.scale_columns = []
        self.load_model()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = ModelService()
        return cls._instance

    def load_model(self):
        # Resolve model path: check backend/model/ then workspace root
        possible_paths = [
            os.path.join(os.path.dirname(__file__), "..", "model", "vehicle_fraud_random_forest.pkl"),
            os.path.join(os.path.dirname(__file__), "..", "..", "vehicle_fraud_random_forest.pkl"),
            "vehicle_fraud_random_forest.pkl"
        ]

        model_path = None
        for path in possible_paths:
            if os.path.exists(path):
                model_path = path
                break

        if not model_path:
            raise FileNotFoundError("Trained model package 'vehicle_fraud_random_forest.pkl' not found.")

        package = joblib.load(model_path)
        self.model = package["model"]
        self.scaler = package["scaler"]
        self.features = package["features"]
        self.scale_columns = package["scale_columns"]
        print(f"[ModelService] Loaded model successfully with {len(self.features)} features and {len(self.scale_columns)} scale columns.")

    def predict(self, input_dict: Dict[str, Any]) -> PredictionResponse:
        start_time = time.perf_counter()

        # 1. Preprocess and scale input data
        X_scaled = preprocess_claim_input(input_dict, self.features, self.scale_columns, self.scaler)

        # 2. Model Prediction
        prediction_val = int(self.model.predict(X_scaled)[0])

        # 3. Model Probability
        if hasattr(self.model, "predict_proba"):
            probabilities = self.model.predict_proba(X_scaled)[0]
            prob_fraud = float(probabilities[1])
        else:
            prob_fraud = 1.0 if prediction_val == 1 else 0.0

        inference_time = (time.perf_counter() - start_time) * 1000

        # 4. Risk Level and Percentage
        risk_percentage = round(prob_fraud * 100, 1)

        if prob_fraud < 0.25:
            risk_level = "Low Risk"
        elif prob_fraud < 0.50:
            risk_level = "Medium Risk"
        elif prob_fraud < 0.75:
            risk_level = "High Risk"
        else:
            risk_level = "Critical Risk"

        result_label = "Potential Fraud" if prediction_val == 1 else "Not Fraud"

        # 5. Explanatory Contributing Factors
        factors = []
        total_claim = float(input_dict.get("total_claim", input_dict.get("totalClaim", 0)))
        vehicle_price = float(input_dict.get("vehicle_price", input_dict.get("vehiclePrice", 25000)))
        safety_rating = float(input_dict.get("safety_rating", input_dict.get("safetyRating", 75)))
        past_claims = float(input_dict.get("past_num_of_claims", input_dict.get("pastNumOfClaims", input_dict.get("previousClaims", 0))))
        liab_prct = float(input_dict.get("liab_prct", input_dict.get("liabPrct", 30)))
        police_rep = str(input_dict.get("police_report", input_dict.get("policeReport", ""))).lower()
        witness_pres = str(input_dict.get("witness_present", input_dict.get("witnessPresent", ""))).lower()
        addr_change = str(input_dict.get("address_change", input_dict.get("addressChange", ""))).lower()

        # Check Claim-to-Value Ratio
        claim_ratio = (total_claim / vehicle_price) if vehicle_price > 0 else 0
        if claim_ratio >= 0.8:
            factors.append(ContributingFactor(
                title="Elevated Claim to Vehicle Value Ratio",
                impact="High Impact",
                description=f"Total claim (${total_claim:,.0f}) represents {claim_ratio * 100:.1f}% of total vehicle market value."
            ))
        elif claim_ratio >= 0.5:
            factors.append(ContributingFactor(
                title="Moderate Claim to Value Ratio",
                impact="Medium Impact",
                description=f"Claim amount constitutes {claim_ratio * 100:.1f}% of estimated vehicle value."
            ))

        # Check Police Report
        if police_rep in ("0", "no", "false", "unreported"):
            factors.append(ContributingFactor(
                title="Unreported Police Documentation",
                impact="High Impact",
                description="Absence of official law enforcement documentation at the time of the incident."
            ))

        # Check Witness
        if witness_pres in ("0", "no", "false"):
            factors.append(ContributingFactor(
                title="No Neutral Eyewitnesses",
                impact="Medium Impact",
                description="No independent third-party witness statements were recorded for the claim."
            ))

        # Check Prior Claims
        if past_claims >= 2:
            factors.append(ContributingFactor(
                title="Multiple Prior Claims Registered",
                impact="High Impact",
                description=f"Policyholder has registered {int(past_claims)} previous claims within the historical monitoring period."
            ))

        # Check Liability Percentage
        if liab_prct > 50:
            factors.append(ContributingFactor(
                title="Elevated Liability Exposure",
                impact="Medium Impact",
                description=f"Assigned driver liability is at {liab_prct:.0f}%, indicating higher contested accident fault."
            ))

        # Check Safety Rating
        if safety_rating < 60:
            factors.append(ContributingFactor(
                title="Below Average Vehicle/Driver Safety Rating",
                impact="Medium Impact",
                description=f"Safety score ({safety_rating:.0f}/100) falls below typical portfolio benchmark."
            ))

        # Check Address Change
        if addr_change in ("1", "yes", "true") or "recent" in addr_change:
            factors.append(ContributingFactor(
                title="Recent Address Modification",
                impact="Low Impact",
                description="Policyholder updated primary residence address within the past 12 months."
            ))

        # Fallback if no negative factors
        if not factors:
            factors.append(ContributingFactor(
                title="Standard Claim Profile Parameters",
                impact="Neutral Impact",
                description="All submitted claim parameters align within standard legitimate operational thresholds."
            ))

        # Explanation
        if prediction_val == 1:
            explanation = (
                f"The Random Forest model identified this claim as having characteristics associated with the fraud class "
                f"with an estimated probability of {risk_percentage}%. This result is a machine-learning prediction and should "
                f"not be treated as a definitive fraud determination."
            )
        else:
            explanation = (
                f"The Random Forest model evaluated this claim with low fraud probability ({risk_percentage}%), consistent with "
                f"legitimate claim patterns across historical portfolio data."
            )

        # Dataset Benchmarks (verified from insurance_fraud_preprocessed_without_scaled.csv)
        benchmarks = PersonalizedBenchmarks(
            userClaim=round(total_claim, 2),
            avgClaim=22864.0,
            userPrice=round(vehicle_price, 2),
            avgPrice=22925.0,
            userSafety=round(safety_rating, 1),
            avgSafety=73.7,
            userPrevClaims=round(past_claims, 1),
            avgPrevClaims=0.5
        )

        return PredictionResponse(
            prediction=prediction_val,
            result=result_label,
            probability=round(prob_fraud, 4),
            risk_percentage=risk_percentage,
            risk_level=risk_level,
            explanation=explanation,
            contributing_factors=factors,
            personalized_benchmarks=benchmarks,
            inference_time_ms=round(inference_time, 2)
        )

    def get_model_info(self) -> ModelInfoResponse:
        params = self.model.get_params()
        return ModelInfoResponse(
            model="Random Forest Classifier",
            algorithm="Random Forest",
            n_estimators=params.get("n_estimators", 500),
            max_depth=params.get("max_depth", 7),
            min_samples_split=params.get("min_samples_split", 30),
            min_samples_leaf=params.get("min_samples_leaf", 15),
            max_features=str(params.get("max_features", "sqrt")),
            max_samples=params.get("max_samples", 0.6),
            class_weight=params.get("class_weight", {0: 1, 1: 2}),
            random_state=params.get("random_state", 42),
            total_features=len(self.features),
            feature_names=self.features,
            scaled_feature_names=self.scale_columns,
            training_samples=9584,
            testing_samples=2396
        )
