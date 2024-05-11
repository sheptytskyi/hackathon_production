from rest_framework import serializers
from .models import CustomUserModel


class UserSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(write_only=True)
    password_2 = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get("password")
        password_confirm = data.pop("password_2", None)

        if password != password_confirm:
            raise serializers.ValidationError("Passwords do not match")

        return data

    def create(self, validated_data):
        return CustomUserModel.objects.create_user(**validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ('phone_number', 'first_name', 'last_name', 'date_joined')
        