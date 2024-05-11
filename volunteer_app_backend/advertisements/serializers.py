from django.db import transaction
from rest_framework import serializers

from advertisements.models import Picture, Advertisement, StatusChoices


class PictureSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(
        max_length=None, use_url=True
    )

    class Meta:
        model = Picture
        fields = ['picture']


class AdvertisementCreateSerializer(serializers.Serializer):
    picture = serializers.ListField(child=serializers.ImageField(), required=False)
    lost_person_first_name = serializers.CharField()
    lost_person_second_name = serializers.CharField()
    description = serializers.CharField(max_length=999)
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    date_lost = serializers.DateField()

    def validate(self, data):
        if self.instance:
            return data
        curr_user = self.context['request'].user
        if Advertisement.objects.filter(author=curr_user, status='active').exists():
            raise serializers.ValidationError("You already have an active advertisement.")
        return data

    def create(self, validated_data):
        pictures_data = validated_data.pop('picture', None)

        author = self.context['request'].user

        with transaction.atomic():
            advertisement = Advertisement.objects.create(author=author, **validated_data)

            Picture.objects.bulk_create([
                Picture(advertisement=advertisement, picture=picture_data)
                for picture_data in pictures_data
            ])

        return advertisement


class AdvertisementDeleteSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=StatusChoices)

    def destroy(self, validated_data):
        author = self.context['request'].user
        advertisement = Advertisement.objects.filter(author=author).first()
        advertisement.status = validated_data['status']
        advertisement.save()
        return advertisement


