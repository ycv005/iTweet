from django.test import TestCase
from tweets.models import Tweet
from django.contrib.auth import get_user_model


def get_testuser_credential():
    credential = {
        'username': 'testdummy',
        'email': 'testdummy@test.com',
        'password': 'testpassword'
    }
    return credential


class TweetTestCase(TestCase):
    """Test module for Tweet model"""
    @classmethod
    def setUpTestData(self):
        """set up test data for whole class"""
        self.user = get_user_model().objects.create_user(**get_testuser_credential())


    def setUp(self):
        """Set up data for each test method"""
        self.tweet1 = Tweet.objects.create(
            user=self.user,
            context='My first tweet'
        )
        self.tweet2 = Tweet.objects.create(
            user=self.user,
            context='My second tweet'
        )

    def test_tweet_context(self):
        """Test tweet model are created successfully"""
        tweet_obj1 = Tweet.objects.get(pk=self.tweet1.id)
        self.assertEqual(self.tweet1.id, tweet_obj1.id)
        self.assertEqual(self.tweet1.context, tweet_obj1.context)

        tweet_obj2 = Tweet.objects.get(pk=self.tweet2.id)
        self.assertEqual(self.tweet2.id, tweet_obj2.id)
        self.assertEqual(self.tweet2.context, tweet_obj2.context)
