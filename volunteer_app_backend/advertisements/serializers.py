from django.db import transaction
from rest_framework import serializers

from advertisements.models import Picture, Advertisement, StatusChoices
from advertisements.enums import WAR_AREA
from services.location import get_location


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
        location_data = get_location(validated_data["latitude"], validated_data["longitude"])

        if location_data not in WAR_AREA:
            raise serializers.ValidationError("This area is not available.")

        author = self.context['request'].user

        with transaction.atomic():
            advertisement = Advertisement.objects.create(
                author=author,
                location_data=f"{location_data.state}" + f", {location_data.district}" if location_data.district else None,
                **validated_data
            )

            Picture.objects.bulk_create([
                Picture(advertisement=advertisement, picture=picture_data)
                for picture_data in pictures_data
            ])

        return advertisement


class AdvertisementDeleteSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=StatusChoices)

    def destroy(self, validated_data):
        author = self.context['request'].user

        advertisement = Advertisement.objects.filter(author=author, status=StatusChoices.active).first()
        if advertisement is not None:
            advertisement.status = validated_data['status']
            advertisement.save()
            return advertisement
        raise serializers.ValidationError("User has got no active advertisements.")


class AdvertisementListSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()

    class Meta:
        model = Advertisement
        fields = [
            'lost_person_first_name', 'lost_person_second_name',
            'pictures',
            'description', 'latitude', 'longitude',
            'location_data', 'date_lost', 'time_created',
        ]

    def get_pictures(self, instance):
        adv_picture = instance.pictures.all()
        return PictureSerializer(instance=adv_picture, many=True).data
