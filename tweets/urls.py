from django.urls import path, include
from .views import TweetList, TweetDetails
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', TweetList.as_view(), name='all_tweet'),
    path('<int:pk>', TweetDetails.as_view(), name='detail_tweet')
]