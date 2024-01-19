import redis
import json
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from fastapi import FastAPI

app = FastAPI()

origins = ["*"]

host= 'ec2-54-91-229-46.compute-1.amazonaws.com'

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
    formatted_data = {key.decode('utf-8'): json.loads(value.decode('utf-8')) for key, value in data.items()}

    current_time = datetime.now()
    filtered_data = {key: value for key, value in formatted_data.items() if current_time - datetime.strptime(value['timestamp'], '%Y-%m-%d %H:%M:%S.%f') < timedelta(hours=12)}

    sorted_data = sorted(filtered_data.items(), key=lambda x: datetime.strptime(x[1]['timestamp'], '%Y-%m-%d %H:%M:%S.%f'), reverse=True)[:10]

    result_dict = {key: value for key, value in sorted_data}
    return result_dict

