from django.contrib.auth.forms import UserCreationForm
from phonenumber_field.formfields import PhoneNumberField
from .models import CustomUserModel


class CustomUserCreationForm(UserCreationForm):
    phone_number = PhoneNumberField()
    class Meta(UserCreationForm.Meta):
        model = CustomUserModel
        fields = ('phone_number', 'first_name', 'last_name')
