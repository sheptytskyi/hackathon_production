import requests
import os
from requests.structures import CaseInsensitiveDict

from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


geo_api_key = os.getenv('GEOAPI_KEY')
URL = "https://api.geoapify.com/v1/geocode/reverse?lat={}&lon={}&apiKey=" + geo_api_key


@dataclass
class LocationInfo:
    state: str
    district: str | None


def get_location(latitude: float, longitude: float) -> LocationInfo:
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    data = requests.get(URL.format(latitude, longitude), headers=headers).json()['features'][0]['properties']
    return LocationInfo(
        state=data['state'],
        district=data.get('district', None),
    )
