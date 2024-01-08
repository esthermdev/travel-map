from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from crud import read_data, read_location, add_new_location, delete_location
from starlette.middleware.trustedhost import TrustedHostMiddleware


app = FastAPI()
SOURCE_FILENAME = "locations.json"

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="static")

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

class Input(BaseModel):
    latitude: float
    longitude: float
    name_of_location: str
    description: str
    photos: list

@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/locations")
def get_data():
    data = read_data(SOURCE_FILENAME)
    return data

@app.get("/location/{city}")
def get_location(city: str):
    data = read_location(city, SOURCE_FILENAME)
    return data

@app.post("/location/add")
def add_location(new_location: Input):
    
    add_new_location(new_location.dict(), SOURCE_FILENAME)
    # you want to return the new location that is added
    # you want to return the output of the previous function
    return new_location.dict()

@app.post("/location/delete/{city}")
def remove_location(city: str):
    delete_location(city, SOURCE_FILENAME)
    # you dont want to just return the input,
    # you want to return the output of the previous function
    return city
