import sys
import pickle

try:
    import tensorflow as tf
except ImportError:
    print("tensorflow not installed")
    sys.exit(1)

scaler_path = "/Users/vivekpuli/Downloads/untitled folder 2/scaler.pkl"
model_path = "/Users/vivekpuli/Downloads/untitled folder 2/blood_model.keras"

print("--- SCALER FEATURES ---")
try:
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)
    if hasattr(scaler, 'feature_names_in_'):
        print(list(scaler.feature_names_in_))
    else:
        print(f"Number of features: {getattr(scaler, 'n_features_in_', 'Unknown')}")
except Exception as e:
    print("Scaler error:", e)

print("--- MODEL INPUTS ---")
try:
    model = tf.keras.models.load_model(model_path)
    for i, t in enumerate(model.inputs):
        print(f"Input {i}: {t.shape}, {t.dtype}")
except Exception as e:
    print("Model error:", e)
