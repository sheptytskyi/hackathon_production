from django.urls import path

from . import views

urlpatterns = [
    path("create/", views.AdvertisementCreateAPIView.as_view(), name="create"),
    path("all/", views.AdvertisementGetAllAPIView.as_view(), name="get_all"),
]