from django.urls import path

from . import views

urlpatterns = [
    path("", views.AdvertisementAPIView.as_view(), name="create"),
    path("all/", views.AdvertisementGetAllAPIView.as_view(), name="get_all"),
]
