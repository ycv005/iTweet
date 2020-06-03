from django.test import TestCase
from tweets.models import Tweet, Image
from django.contrib.auth import get_user_model
from PIL import Image as pil_image
import tempfile
from django.test import override_settings


def get_testuser_credential():
    credential = {
        'username': 'testdummy',
        'email': 'testdummy@test.com',
        'password': 'testpassword'
    }
    return credential

def get_test_user():
    return get_user_model().objects.create_user(
        **get_testuser_credential()
    )

def get_temporary_image(temp_file):
    size = (200, 200)
    color = (255, 0, 0, 0)
    image = pil_image.new("RGB", size, color)
    image.save(temp_file, 'jpeg')
    return temp_file


class TweetModelTestCase(TestCase):
    """Test module for Tweet model"""
    def setUp(self):
        """Set up data for each test method"""
        user = get_test_user()
        self.tweet1 = Tweet.objects.create(
            user=user,
            context='My first tweet'
        )
        self.tweet2 = Tweet.objects.create(
            user=user,
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

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_tweet_image(self):
        """Test tweet model with images are created successfully"""
        temp_file = tempfile.NamedTemporaryFile()
        test_img1 = get_temporary_image(temp_file)
        test_img2 = get_temporary_image(temp_file)
        Image.objects.create(
            tweet=self.tweet1,
            image=test_img1.name
        )
        Image.objects.create(
            tweet=self.tweet1,
            image=test_img2.name
        )
        tweet_imgs = self.tweet1.image_set.all()
        self.assertEqual(2, len(tweet_imgs))


class ImageModelTestCase(TestCase):
    """Test module for the Image model"""
    def setUp(self):
        self.tweet_obj = Tweet.objects.create(
            user=get_test_user(),
            context="My new tweet"
        )

    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def test_image_model(self):
        """Test image object creation"""
        temp_file = tempfile.NamedTemporaryFile()
        test_image = get_temporary_image(temp_file)
        # passing image as image.name, it gives location
        # in case of response upload, pass only image
        image_obj = Image.objects.create(
            tweet=self.tweet_obj,
            image=test_image.name
        )
        self.assertEqual(len(Image.objects.all()), 1)
