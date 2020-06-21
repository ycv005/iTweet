from django.shortcuts import redirect, reverse
from .models import Tweet, Image
from rest_framework import generics, permissions, status
from .serializers import TweetSerializer
from .forms import TweetForm
from django.utils.http import is_safe_url
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner


class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TweetDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request):
    # need to send back serialized data that js could use
    serializer = TweetSerializer(
        data=request.POST, context={'request': request})
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def tweet_list_view(request):
    serializer = TweetSerializer(
        data=Tweet.objects.all(), many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsOwner])
def tweet_detail_view(request, pk, *args, **kwargs):
    try:
        obj = Tweet.objects.get(pk=pk)
        serializer = TweetSerializer(obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Tweet.DoesNotExist:
        return Response(
            {'message': 'Tweet not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsOwner])
def tweet_delete_view(request, pk, *args, **kwargs):
    try:
        obj = Tweet.objects.get(pk=pk)
        obj.delete()
        return Response({}, staus=status.HTTP_200_OK)
    except Tweet.DoesNotExist:
        return Response(
            {'message': 'Tweet not found'},
            status=status.HTTP_404_NOT_FOUND
        )


def tweet_create_view_pure_django(request):
    if not request.user.is_authenticated:
        if request.is_ajax():
            return Response({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        context = form.cleaned_data['context']
        images = request.FILES.getlist('images')
        tweet_obj = Tweet.objects.create(
            user=request.user,
            context=context
        )
        for img in images:
            Image.objects.create(image=img, tweet=tweet_obj)
        if request.is_ajax():
            return Response(tweet_obj.serialize())
    elif form.errors and request.is_ajax():
        print("form error- ", form.errors)
        return Response(form.errors, status=400)
    if not next_url or not is_safe_url(next_url, settings.ALLOWED_HOSTS):
        next_url = reverse('home')
    return redirect(next_url)
