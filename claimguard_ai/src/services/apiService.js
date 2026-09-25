// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || '/svc/api';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// });

// /**
//  * Predict vehicle insurance claim fraud risk using trained Random Forest model.
//  * @param {Object} claimData - Full claim parameters matching model features
//  * @returns {Promise<Object>} Prediction result with risk level, probability, factors, and benchmarks
//  */
// export const predictClaimFraud = async (claimData) => {
//   try {
//     const response = await apiClient.post('/predict', claimData);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data && error.response.data.detail) {
//       throw new Error(error.response.data.detail);
//     } else if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
//       throw new Error('Unable to connect to ClaimGuard AI prediction backend. Please ensure the FastAPI server is running on http://localhost:8000.');
//     }
//     throw new Error('Unable to analyze this claim. Please verify the entered information and try again.');
//   }
// };

// /**
//  * Fetch verified model evaluation metrics calculated in Model-Creation.ipynb.
//  * @returns {Promise<Object>} Metrics including accuracy, precision, recall, F1, and confusion matrix
//  */
// export const fetchModelAnalytics = async () => {
//   try {
//     const response = await apiClient.get('/analytics/model');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch model analytics from backend:', error);
//     // Return verified notebook fallback if backend is momentarily unreachable
//     return {
//       model_name: 'Random Forest Classifier',
//       algorithm: 'Supervised Ensemble - Random Forest',
//       accuracy: 0.7738,
//       precision: 0.7831,
//       recall: 0.1104,
//       f1_score: 0.1935,
//       training_accuracy: 0.7823,
//       testing_accuracy: 0.7738,
//       accuracy_gap: 0.0086,
//       training_samples: 9584,
//       testing_samples: 2396,
//       total_samples: 11980,
//       confusion_matrix: [
//         [1789, 18],
//         [524, 65]
//       ],
//       confusion_matrix_breakdown: {
//         true_negative: 1789,
//         false_positive: 18,
//         false_negative: 524,
//         true_positive: 65
//       }
//     };
//   }
// };

// /**
//  * Check backend service health.
//  */
// export const checkBackendHealth = async () => {
//   try {
//     const response = await apiClient.get('/health');
//     return response.data;
//   } catch (error) {
//     return { status: 'down', model_loaded: false };
//   }
// };



import axios from 'axios';

// In production (Vercel), vercel.json rewrites "/api/(.*)" to the FastAPI
// backend service, and the backend receives that full path (its routes are
// mounted under "/api" in main.py to match). For local development, set
// VITE_API_URL=http://localhost:8000/api in a .env file to point at your
// locally running `uvicorn main:app` server.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Predict vehicle insurance claim fraud risk using trained Random Forest model.
 * @param {Object} claimData - Full claim parameters matching model features
 * @returns {Promise<Object>} Prediction result with risk level, probability, factors, and benchmarks
 */
export const predictClaimFraud = async (claimData) => {
  try {
    const response = await apiClient.post('/predict', claimData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    } else if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      throw new Error('Unable to connect to ClaimGuard AI prediction backend. Please ensure the FastAPI server is running on http://localhost:8000.');
    }
    throw new Error('Unable to analyze this claim. Please verify the entered information and try again.');
  }
};

/**
 * Fetch verified model evaluation metrics calculated in Model-Creation.ipynb.
 * @returns {Promise<Object>} Metrics including accuracy, precision, recall, F1, and confusion matrix
 */
export const fetchModelAnalytics = async () => {
  try {
    const response = await apiClient.get('/analytics/model');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch model analytics from backend:', error);
    // Return verified notebook fallback if backend is momentarily unreachable
    return {
      model_name: 'Random Forest Classifier',
      algorithm: 'Supervised Ensemble - Random Forest',
      accuracy: 0.7738,
      precision: 0.7831,
      recall: 0.1104,
      f1_score: 0.1935,
      training_accuracy: 0.7823,
      testing_accuracy: 0.7738,
      accuracy_gap: 0.0086,
      training_samples: 9584,
      testing_samples: 2396,
      total_samples: 11980,
      confusion_matrix: [
        [1789, 18],
        [524, 65]
      ],
      confusion_matrix_breakdown: {
        true_negative: 1789,
        false_positive: 18,
        false_negative: 524,
        true_positive: 65
      }
    };
  }
};

/**
 * Check backend service health.
 */
export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    return { status: 'down', model_loaded: false };
  }
};