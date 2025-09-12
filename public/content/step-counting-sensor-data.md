# Step Counting with Sensor Data

**Summary**: Developed a robust pipeline to accurately count left and right steps from raw IMU sensor data using signal processing, feature engineering, and machine learning. Built surrogate labeling system and compared deep learning vs. ensemble approaches.

## Highlights
- Signal processing pipeline with Butterworth filtering and peak detection
- GRU-based sequential model achieving MSE ≈ 3.68 validation error
- Random Forest with engineered features (MAE ≈ 2.05) as competitive alternative
- Robust preprocessing handling inconsistent sampling rates and time formats
- Left/right step separation for accurate bilateral counting

## Technical Approach
- **Data Processing**: Standardized timestamps, computed acceleration magnitude, applied low-pass filtering
- **Feature Engineering**: 13-dimensional time series including accelerometer, gyroscope, and derived features
- **Surrogate Labeling**: Peak detection on filtered signals to generate training labels
- **Model Comparison**: Sequential models (GRU, LSTM, CNN-LSTM) vs. tree ensembles (Random Forest, XGBoost)

## Results
- **Best Sequential Model**: 2-layer GRU with dropout (Val MSE ≈ 3.68)
- **Best Feature Model**: Random Forest with summary statistics (MAE ≈ 2.05)
- Successfully handled varying sampling frequencies and inconsistent data formats
- Generalizable pipeline for IMU-based step counting applications

## Tech Stack
Python • SciPy • PyTorch • XGBoost • Signal Processing • Time Series Analysis
