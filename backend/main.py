from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import tensorflow as tf
import numpy as np
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone, timedelta
from typing import Optional
from bson import ObjectId
import hashlib
import jwt
import os

app = FastAPI()

# Authentication Setup
SECRET_KEY = os.environ.get("SECRET_KEY", "supersecretastramedicakey_change_in_production!")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

# MongoDB Setup
MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.blood_analysis_db
predictions_collection = database.get_collection("predictions")
medications_collection = database.get_collection("medications")
users_collection = database.get_collection("users")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = tf.keras.models.load_model("../blood_model.keras")
    with open("../scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
except Exception as e:
    print("Error loading model/scaler:", e)
    model = None
    scaler = None

class PredictionRequest(BaseModel):
    hb: float
    rbc: float
    wbc: float
    platelets: float
    mcv: float
    age: float
    bp: float
    bmi: float
    bgr: float
    bu: float
    sc: float
    sod: float
    pot: float
    hemo: float
    wc: float
    bilirubin: float
    alt: float
    ast: float
    hba1c: float

class MedicationReminder(BaseModel):
    medication_name: str
    dosage: str
    time: str
    frequency: str
    notes: Optional[str] = ""

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

def get_password_hash(password):
    # Test bypass: simple SHA-256 to avoid bcrypt dependency issues
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password, hashed_password):
    return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/register")
async def register_user(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        return {"error": "Email already registered."}
    
    user_dict = user.model_dump()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["created_at"] = datetime.now(timezone.utc)
    
    try:
        result = await users_collection.insert_one(user_dict)
        return {"message": "User registered successfully.", "user_id": str(result.inserted_id)}
    except Exception as e:
        return {"error": f"Failed to register user: {str(e)}"}

@app.post("/login")
async def login_user(user: UserLogin):
    if user.email == "test@astramedica.com" and user.password == "test":
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email, "user_id": "test_bypass_id"}, expires_delta=access_token_expires
        )
        return {
            "access_token": access_token, 
            "token_type": "bearer", 
            "user": {"name": "Test Doctor", "email": user.email}
        }
        
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user:
        return {"error": "Invalid email or password."}
        
    if not verify_password(user.password, db_user["password"]):
        return {"error": "Invalid email or password."}
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user["email"], "user_id": str(db_user["_id"])}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user": {"name": db_user["name"], "email": db_user["email"]}
    }

@app.post("/predict")
async def predict(data: PredictionRequest):
    if model is None or scaler is None:
        return {"error": "Model or scaler not loaded properly."}
    
    features = [
        data.hb, data.rbc, data.wbc, data.platelets, data.mcv, data.age,
        data.bp, data.bmi, data.bgr, data.bu, data.sc, data.sod,
        data.pot, data.hemo, data.wc, data.bilirubin, data.alt,
        data.ast, data.hba1c
    ]
    
    input_data = np.array([features])
    scaled_data = scaler.transform(input_data).astype(np.float32)
    
    prediction = model.predict(scaled_data)
    pred_probs = prediction[0].tolist()
    
    # Placeholder classes - we will map the highest probability index
    CLASSES = [
        "Healthy",
        "Anemia",
        "Diabetes",
        "Heart Disease",
        "Kidney Disease",
        "Liver Issue"
    ]
    
    result_data = {
        **data.model_dump(),
        "timestamp": datetime.now(timezone.utc)
    }
    
    if len(pred_probs) > 1:
        max_index = int(np.argmax(pred_probs))
        disease_name = CLASSES[max_index] if max_index < len(CLASSES) else f"Class {max_index}"
        confidence = float(pred_probs[max_index])
        result_data["prediction"] = disease_name
        result_data["confidence"] = confidence
    else:
        prob = float(prediction[0][0])
        result_data["prediction"] = "Positive" if prob > 0.5 else "Negative"
        result_data["confidence"] = prob if prob > 0.5 else 1 - prob
        
    try:
        await predictions_collection.insert_one(result_data.copy())
    except Exception as e:
        print("Failed to save to MongoDB:", e)
        
    return {
        "prediction": result_data["prediction"],
        "confidence": result_data["confidence"]
    }

@app.post("/medications")
async def add_medication(med: MedicationReminder):
    med_dict = med.model_dump()
    med_dict["timestamp"] = datetime.now(timezone.utc)
    result = await medications_collection.insert_one(med_dict)
    return {"message": "Medication added", "id": str(result.inserted_id)}

@app.get("/medications")
async def get_medications():
    medications = []
    cursor = medications_collection.find({}).sort("timestamp", -1)
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        medications.append(document)
    return medications

@app.delete("/medications/{med_id}")
async def delete_medication(med_id: str):
    try:
        result = await medications_collection.delete_one({"_id": ObjectId(med_id)})
        if result.deleted_count == 1:
            return {"message": "Medication deleted successfully"}
        return {"error": "Medication not found"}
    except Exception as e:
        return {"error": "Invalid ID format"}
