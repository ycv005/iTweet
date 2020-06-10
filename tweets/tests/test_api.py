from django.test import TestCase
import tempfile
from .test_model import get_test_user, get_temporary_image
from django.urls import reverse
from tweets.models import Tweet
from rest_framework import status
from rest_framework.test import APIClient
from tweets.serializers import TweetSerializer


TWEET_URL = reverse('tweets:all_tweet')


class TweetTestCase(TestCase):
    def setUp(self):
        """Test data for the tweet create"""
        self.client = APIClient()
        self.user = get_test_user()
        self.client.force_authenticate(self.user)
        self.tweet_data = {
            'user': self.user,
            'context': "testing tweet via rest"
        }

    def test_tweet_context(self):
        """Test tweet creation with context"""
        response = self.client.post(TWEET_URL, self.tweet_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        tweet_exists = Tweet.objects.filter(**self.tweet_data).exists()
        self.assertTrue(tweet_exists)

    def test_get_all_tweet(self):
        """Test retrieve all tweets created till now"""
        Tweet.objects.create(**self.tweet_data)
        Tweet.objects.create(
            user=self.user,
            context='another tweet'
        )
        response = self.client.get(TWEET_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        tweets = Tweet.objects.all()
        serializer = TweetSerializer(tweets, many=True)
        self.assertEqual(serializer.data, response.data)

    def test_invalid_tweet(self):
        """Test to create invalid tweet"""
        response = self.client.post(TWEET_URL, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_tweet_with_image(self):
        """Test create tweet with image"""
        temp_file = tempfile.NamedTemporaryFile()
        test_img1 = get_temporary_image(temp_file)
        test_img2 = get_temporary_image(temp_file)
        params = self.tweet_data.copy()
        params['image_1'] = test_img1
        params['image_2'] = test_img2
        response = self.client.post(
            TWEET_URL,
            data=params,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
