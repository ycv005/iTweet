from django.urls import path
from .views import TweetList, TweetDetails

app_name = 'tweet'
urlpatterns = [
    path('', TweetList.as_view(), name='list-tweet'),
    path('<int:pk>', TweetDetails.as_view(), name='tweet-detail')
]
