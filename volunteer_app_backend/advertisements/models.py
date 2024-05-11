from datetime import date

from django.db import models

from users.models import CustomUserModel


class StatusChoices(models.TextChoices):
    active = 'active', 'Активне'
    closed_found = 'closed_found', "Закрите, людину знайдено"
    closed_not_found = 'closed_not_found', "Закрите, людину не знайдено"


def img_path(instance, filename=None):
    return f'advertisement_pictures/{date.today()}/{instance.advertisement.id}/{filename}'


class Advertisement(models.Model):
    author = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    lost_person_first_name = models.CharField(verbose_name="Ім'я людини, що загубилася", max_length=255)
    lost_person_second_name = models.CharField(verbose_name="Прізвище людини, що загубилася", max_length=255)
    description = models.TextField(verbose_name="Опис")
    latitude = models.FloatField(verbose_name="Широта")
    longitude = models.FloatField(verbose_name="Довгота")
    location_data = models.CharField(verbose_name="Додаткова інформація про місцезнаходження", max_length=255)
    date_lost = models.DateField(verbose_name="Дата, коли людинна загубилася")
    time_created = models.DateTimeField(verbose_name="Час створення заявки", auto_now_add=True)
    status = models.CharField(verbose_name="Статус", choices=StatusChoices.choices,
                              default=StatusChoices.active, max_length=99)

    @property
    def user_name(self):
        return f'{self.author.first_name} {self.author.last_name}'

    class Meta:
        db_table = 'advertisements'
        verbose_name = 'Оголошення'
        verbose_name_plural = 'Оголошення'

    def __str__(self) -> str:
        return str(self.lost_person_first_name)


class Picture(models.Model):
    picture = models.ImageField(verbose_name='Фотографія', upload_to=img_path, null=True, blank=True)
    advertisement = models.ForeignKey(
        Advertisement,
        related_name='pictures',
        on_delete=models.SET_NULL,
        null=True, blank=True)

    class Meta:
        db_table = 'Picture'
        verbose_name = 'Картинка'
        verbose_name_plural = 'Картинки'

    def __str__(self) -> str:
        return str(self.id) + " " + str(self.advertisement)
