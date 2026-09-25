from schemas.prediction import ModelAnalyticsResponse

def get_real_model_analytics() -> ModelAnalyticsResponse:
    """
    Returns verified model evaluation metrics calculated in Model-Creation.ipynb.
    These metrics represent the exact performance of the trained Random Forest Classifier.
    """
    return ModelAnalyticsResponse(
        model_name="Random Forest Classifier",
        algorithm="Supervised Ensemble - Random Forest",
        accuracy=0.7738,
        precision=0.7831,
        recall=0.1104,
        f1_score=0.1935,
        training_accuracy=0.7823,
        testing_accuracy=0.7738,
        accuracy_gap=0.0086,
        training_samples=9584,
        testing_samples=2396,
        total_samples=11980,
        confusion_matrix=[
            [1789, 18],
            [524, 65]
        ],
        confusion_matrix_breakdown={
            "true_negative": 1789,
            "false_positive": 18,
            "false_negative": 524,
            "true_positive": 65
        }
    )
