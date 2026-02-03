from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import bcrypt
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Mount static files for image serving
static_dir = ROOT_DIR / "static"
static_dir.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str

class AdminLogin(BaseModel):
    username: str
    password: str

class StudentOfMonth(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    class_name: str
    month: str
    year: int
    reason: str
    photo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TopStudent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subject: str
    name: str
    class_name: str
    achievement: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Activity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    date: str
    images: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Tournament(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    sport_type: str
    date: str
    results: str
    winners: str
    images: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Announcement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class HeroSlide(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image_url: str
    link: Optional[str] = None
    slide_type: str = "event"
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Auth endpoints
@api_router.post("/auth/login")
async def admin_login(credentials: AdminLogin):
    admin = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode('utf-8'), admin['password_hash'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"success": True, "username": admin['username']}

@api_router.post("/auth/setup")
async def setup_admin(credentials: AdminLogin):
    existing = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    password_hash = bcrypt.hashpw(credentials.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    admin = Admin(username=credentials.username, password_hash=password_hash)
    doc = admin.model_dump()
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.admins.insert_one(doc)
    return {"success": True, "message": "Admin created"}

# Upload endpoint
@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = static_dir / "uploads" / unique_filename
    
    (static_dir / "uploads").mkdir(exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"url": f"/static/uploads/{unique_filename}"}

# Student of Month endpoints
@api_router.get("/student-of-month", response_model=List[StudentOfMonth])
async def get_student_of_month():
    students = await db.student_of_month.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for s in students:
        if isinstance(s.get('created_at'), str):
            s['created_at'] = datetime.fromisoformat(s['created_at'])
    return students

@api_router.post("/student-of-month", response_model=StudentOfMonth)
async def create_student_of_month(student: StudentOfMonth):
    doc = student.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.student_of_month.insert_one(doc)
    return student

@api_router.put("/student-of-month/{student_id}")
async def update_student_of_month(student_id: str, student: StudentOfMonth):
    doc = student.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.student_of_month.update_one({"id": student_id}, {"$set": doc})
    return {"success": True}

@api_router.delete("/student-of-month/{student_id}")
async def delete_student_of_month(student_id: str):
    await db.student_of_month.delete_one({"id": student_id})
    return {"success": True}

# Top Students endpoints
@api_router.get("/top-students", response_model=List[TopStudent])
async def get_top_students():
    students = await db.top_students.find({}, {"_id": 0}).sort("subject", 1).to_list(1000)
    for s in students:
        if isinstance(s.get('created_at'), str):
            s['created_at'] = datetime.fromisoformat(s['created_at'])
    return students

@api_router.post("/top-students", response_model=TopStudent)
async def create_top_student(student: TopStudent):
    doc = student.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.top_students.insert_one(doc)
    return student

@api_router.put("/top-students/{student_id}")
async def update_top_student(student_id: str, student: TopStudent):
    doc = student.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.top_students.update_one({"id": student_id}, {"$set": doc})
    return {"success": True}

@api_router.delete("/top-students/{student_id}")
async def delete_top_student(student_id: str):
    await db.top_students.delete_one({"id": student_id})
    return {"success": True}

# Activities endpoints
@api_router.get("/activities", response_model=List[Activity])
async def get_activities():
    activities = await db.activities.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for a in activities:
        if isinstance(a.get('created_at'), str):
            a['created_at'] = datetime.fromisoformat(a['created_at'])
    return activities

@api_router.post("/activities", response_model=Activity)
async def create_activity(activity: Activity):
    doc = activity.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.activities.insert_one(doc)
    return activity

@api_router.put("/activities/{activity_id}")
async def update_activity(activity_id: str, activity: Activity):
    doc = activity.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.activities.update_one({"id": activity_id}, {"$set": doc})
    return {"success": True}

@api_router.delete("/activities/{activity_id}")
async def delete_activity(activity_id: str):
    await db.activities.delete_one({"id": activity_id})
    return {"success": True}

# Tournaments endpoints
@api_router.get("/tournaments", response_model=List[Tournament])
async def get_tournaments():
    tournaments = await db.tournaments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for t in tournaments:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return tournaments

@api_router.post("/tournaments", response_model=Tournament)
async def create_tournament(tournament: Tournament):
    doc = tournament.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.tournaments.insert_one(doc)
    return tournament

@api_router.put("/tournaments/{tournament_id}")
async def update_tournament(tournament_id: str, tournament: Tournament):
    doc = tournament.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.tournaments.update_one({"id": tournament_id}, {"$set": doc})
    return {"success": True}

@api_router.delete("/tournaments/{tournament_id}")
async def delete_tournament(tournament_id: str):
    await db.tournaments.delete_one({"id": tournament_id})
    return {"success": True}

# Announcements endpoints
@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements():
    announcements = await db.announcements.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for a in announcements:
        if isinstance(a.get('created_at'), str):
            a['created_at'] = datetime.fromisoformat(a['created_at'])
    return announcements

@api_router.post("/announcements", response_model=Announcement)
async def create_announcement(announcement: Announcement):
    doc = announcement.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.announcements.insert_one(doc)
    return announcement

@api_router.delete("/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str):
    await db.announcements.delete_one({"id": announcement_id})
    return {"success": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()