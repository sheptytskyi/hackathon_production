FROM python:3.11-slim-buster

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update
WORKDIR /volunteer_app_backend

COPY ./requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 8080

COPY . .