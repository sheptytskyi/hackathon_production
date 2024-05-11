from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login_user"),
    path("register/", views.UserRegistrationAPIView.as_view(), name="register_user"),
    path("profile/", views.UserProfileApiView.as_view(), name="user_profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]