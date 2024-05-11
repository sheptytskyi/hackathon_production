from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password, **extra_fields):
        if not phone_number:
            raise ValueError(_("The Email must be set"))
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, phone_number, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(phone_number, password, **extra_fields)


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = "phone_number"

    phone_number = PhoneNumberField(verbose_name=_('phonenumber'), unique=True, db_index=True)
    first_name = models.CharField(verbose_name=_('first name'))
    last_name = models.CharField(verbose_name=_('last name'))
    is_staff = models.BooleanField(verbose_name=_('staff'), default=False)
    is_active = models.BooleanField(verbose_name=_('active'), default=True)
    date_joined = models.DateTimeField(verbose_name=_('date joined'), default=timezone.now)

    objects = CustomUserManager()

    class Meta:
        db_table = 'users'
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'
