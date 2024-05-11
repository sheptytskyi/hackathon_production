from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from advertisements.serializers import AdvertisementCreateSerializer
from advertisements.models import Advertisement


class AdvertisementCreateAPIView(GenericAPIView):
    serializer_class = AdvertisementCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyAdvertisementView(GenericAPIView):
    serializer_class = AdvertisementCreateSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        advertisement = Advertisement.objects.filter(author_id=request.user.id).first()
        serializer = self.get_serializer(instance=advertisement)
        return Response(serializer.data, status=status.HTTP_200_OK)
