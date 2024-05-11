from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from advertisements.serializers import AdvertisementCreateSerializer, AdvertisementListSerializer
from advertisements.models import Advertisement, StatusChoices


class AdvertisementCreateAPIView(GenericAPIView):
    serializer_class = AdvertisementCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdvertisementGetAllAPIView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Advertisement.objects.filter(status=StatusChoices.active)
    serializer_class = AdvertisementListSerializer
    filterset_fields = ['lost_person_first_name', 'lost_person_second_name']
