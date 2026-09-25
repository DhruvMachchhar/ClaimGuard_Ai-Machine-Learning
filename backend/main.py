import logging
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from schemas.prediction import (
    ClaimPredictionInput,
    PredictionResponse,
    ModelAnalyticsResponse,
    ModelInfoResponse,
    HealthResponse
)
from services.model_service import ModelService
from services.analytics_service import get_real_model_analytics

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("claimguard_api")

app = FastAPI(
    title="ClaimGuard AI - Insurance Fraud Detection API",
    description="Production Machine Learning REST API for vehicle insurance fraud classification using a trained Random Forest model.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS specifically for frontend development and local hosts
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Model Service on startup
@app.on_event("startup")
def startup_event():
    try:
        service = ModelService.get_instance()
        logger.info("ClaimGuard AI Random Forest Model loaded and initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to load machine learning model: {e}")

# Exception Handler for generic exceptions to avoid exposing raw tracebacks
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error processing request {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Unable to analyze this claim. Please verify the entered information and try again."}
    )

@app.get("/health", response_model=HealthResponse, summary="API Health Check")
def health_check():
    """
    Returns the API service health and verifies that the Random Forest model is loaded in memory.
    """
    service = ModelService.get_instance()
    is_loaded = service.model is not None and service.scaler is not None
    return HealthResponse(
        status="ok",
        model_loaded=is_loaded,
        model_name="Random Forest Classifier",
        features_count=len(service.features)
    )

@app.get("/model-info", response_model=ModelInfoResponse, summary="Model Metadata & Hyperparameters")
def get_model_info():
    """
    Returns verified configuration, hyperparameters, and feature specifications of the trained model.
    """
    try:
        service = ModelService.get_instance()
        return service.get_model_info()
    except Exception as e:
        logger.error(f"Error fetching model info: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving model metadata."
        )

@app.get("/analytics/model", response_model=ModelAnalyticsResponse, summary="Model Evaluation Performance Metrics")
def get_model_analytics():
    """
    Returns verified accuracy, precision, recall, F1 score, and confusion matrix from Model-Creation.ipynb.
    """
    try:
        return get_real_model_analytics()
    except Exception as e:
        logger.error(f"Error fetching model analytics: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving model performance analytics."
        )

@app.post("/predict", response_model=PredictionResponse, summary="Predict Insurance Claim Fraud Risk")
def predict_claim(claim_input: ClaimPredictionInput):
    """
    Accepts full insurance claim parameters, executes preprocessing, feature scaling,
    and runs the trained Random Forest Classifier to predict fraud risk and anomaly probability.
    """
    try:
        service = ModelService.get_instance()
        input_dict = claim_input.model_dump()
        result = service.predict(input_dict)
        return result
    except ValueError as ve:
        logger.warning(f"Validation error during prediction: {ve}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid claim parameter: {str(ve)}"
        )
    except Exception as e:
        logger.error(f"Model prediction error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to analyze this claim. Please check the entered information and try again."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
