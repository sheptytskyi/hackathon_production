from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from advertisements.serializers import AdvertisementCreateSerializer, AdvertisementListSerializer, \
    AdvertisementDeleteSerializer
from advertisements.models import Advertisement, StatusChoices


class AdvertisementAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdvertisementCreateSerializer
        elif self.request.method == 'DELETE':
            return AdvertisementDeleteSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            adv = serializer.destroy(validated_data=request.data)
            return Response({'advertisement_id': adv.id}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyAdvertisementView(GenericAPIView):
    serializer_class = AdvertisementCreateSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        advertisement = Advertisement.objects.filter(author_id=request.user.id).first()
        serializer = self.get_serializer(instance=advertisement)
        return Response(serializer.data, status=status.HTTP_200_OK)

      
class AdvertisementGetAllAPIView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Advertisement.objects.filter(status=StatusChoices.active)
    serializer_class = AdvertisementListSerializer
    filterset_fields = ['lost_person_first_name', 'lost_person_second_name']
