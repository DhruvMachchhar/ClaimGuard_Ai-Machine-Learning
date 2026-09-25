from datetime import datetime
from typing import Any, Tuple

def parse_binary_feature(val: Any, positive_keywords=("yes", "1", "true", "recent", "male", "rent")) -> int:
    """
    Parses flexible user inputs into binary 0 or 1.
    """
    if isinstance(val, (int, float)):
        return 1 if int(val) > 0 else 0
    if isinstance(val, bool):
        return 1 if val else 0
    
    val_str = str(val).strip().lower()
    
    # Specific categorical mappings
    if val_str in ("m", "male"):
        return 1
    elif val_str in ("f", "female"):
        return 0
    elif val_str in ("married",):
        return 1
    elif val_str in ("single", "unmarried", "divorced", "widowed"):
        return 0
    elif val_str in ("rent", "rented"):
        return 1
    elif val_str in ("own", "owned"):
        return 0
    elif val_str in ("yes", "y", "true", "1"):
        return 1
    elif val_str in ("no", "n", "false", "0"):
        return 0
    elif "recent" in val_str:
        return 1
    elif "same" in val_str:
        return 0
    elif val_str in ("bachelor", "master", "phd", "degree", "doctorate"):
        return 1
    elif val_str in ("high school", "none", "diploma"):
        return 0

    return 1 if any(k in val_str for k in positive_keywords) else 0

def parse_claim_date(date_str: str) -> Tuple[int, int, int, int, str]:
    """
    Parses a date string (e.g. '2024-10-18') and extracts:
    claim_day, claim_month, claim_year, is_weekend, day_of_week_name
    """
    try:
        dt = datetime.strptime(date_str.strip(), "%Y-%m-%d")
    except ValueError:
        # Fallback to current date or ISO parse
        try:
            dt = datetime.fromisoformat(date_str.replace("Z", "+00:00").split("T")[0])
        except Exception:
            dt = datetime.now()

    claim_day = dt.day
    claim_month = dt.month
    claim_year = dt.year
    # dt.weekday(): Monday is 0, Sunday is 6. Saturday=5, Sunday=6
    is_weekend = 1 if dt.weekday() >= 5 else 0
    day_name = dt.strftime("%A")  # 'Monday', 'Tuesday', etc.
    
    return claim_day, claim_month, claim_year, is_weekend, day_name

def normalize_vehicle_category(cat: str) -> str:
    """
    Normalizes vehicle classification into one of the 3 model categories:
    'Compact', 'Large', 'Medium'.
    """
    cat_clean = str(cat).strip().lower()
    
    if "large" in cat_clean or "suv" in cat_clean or "truck" in cat_clean or "van" in cat_clean:
        return "Large"
    elif "compact" in cat_clean or "small" in cat_clean or "hatchback" in cat_clean:
        return "Compact"
    elif "medium" in cat_clean or "sedan" in cat_clean or "sports" in cat_clean or "coupe" in cat_clean:
        return "Medium"
    else:
        return "Medium"  # Default
