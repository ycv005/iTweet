from django.urls import path
from .views import (
    TweetList, TweetDetails, tweet_create_view, tweet_list_view,
    tweet_detail_view, tweet_delete_view
)

app_name = 'tweet'
urlpatterns = [
    path('', TweetList.as_view(), name='list-tweet'),
    path('<int:pk>', TweetDetails.as_view(), name='tweet-detail'),
    path('create', tweet_create_view, name='create-tweet-view'),
    path('list', tweet_list_view, name='list-tweet-view'),
    path('detail/<int:pk>', tweet_detail_view, name='tweet-detail-view'),
    path('delete/<int:pk>', tweet_delete_view, name='tweet-delete-view'),
]
