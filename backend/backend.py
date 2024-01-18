from typing import Union
import redis
from contextlib import asynccontextmanager
import json
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

app = FastAPI()

origins = ["*"]

host= 'ec2-3-80-119-167.compute-1.amazonaws.com'

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fire")
def read_root():
    redis_client = redis.StrictRedis(host=host,
                                     port=6379, password='1SQRr7hyIb7peXvdcT4pSV3iu7lykHVd2qmMm+aOUBvC/Xt3vuLCzNg2QkSztjdY')
    
    data = convert_and_sort(redis_client.hgetall("firedepartment_reports"))

    # Convert data to the desired format
    result_list = [
        {
            "eventId": value["eventId"],
            "eventType": value["eventType"],
            "timestamp": value["timestamp"],
            "description": value["description"],
            "videoPath": value["videoPath"]
        }
        for value in data.values()
    ]

    return result_list


@app.get("/police")
def read_police():
    redis_client = redis.StrictRedis(host=host,
                                     port=6379, password='1SQRr7hyIb7peXvdcT4pSV3iu7lykHVd2qmMm+aOUBvC/Xt3vuLCzNg2QkSztjdY')
    data = convert_and_sort(redis_client.hgetall("police_reports"))

    # Convert data to the desired format
    result_list = [
        {
            "eventId": value["eventId"],
            "eventType": value["eventType"],
            "timestamp": value["timestamp"],
            "description": value["description"],
            "videoPath": value["videoPath"]
        }
        for value in data.values()
    ]

    return result_list

@app.get("/shame")
def read_shame():
    redis_client = redis.StrictRedis(host=host,
                                     port=6379, password='1SQRr7hyIb7peXvdcT4pSV3iu7lykHVd2qmMm+aOUBvC/Xt3vuLCzNg2QkSztjdY')
    data =  convert_and_sort(redis_client.hgetall("smokingPerson"))

    # Convert data to the desired format
    result_list = [
        {
            "eventId": value["eventId"],
            "eventType": value["eventType"],
            "timestamp": value["timestamp"],
            "description": value["description"],
            "videoPath": value["videoPath"]
        }
        for value in data.values()
    ]

    return result_list


def convert_and_sort(data):
    formatted_data = {key.decode(
        'utf-8'): json.loads(value.decode('utf-8')) for key, value in data.items()}

    # Sort the data by timestamp and take first 10 results
    sorted_data = sorted(formatted_data.items(),
                         key=lambda x: x[1]['timestamp'], reverse=True)[:10]

    result_dict = {key: value for key, value in sorted_data}
    return result_dict
