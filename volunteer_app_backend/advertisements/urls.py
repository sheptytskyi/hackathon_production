from django.urls import path

from . import views

urlpatterns = [
    path("", views.AdvertisementAPIView.as_view(), name="create"),
]
