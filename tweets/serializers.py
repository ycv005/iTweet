from rest_framework import serializers
from .models import Tweet, Image


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class TweetSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    images = ImageSerializer(source='image_set', many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='tweet:tweet-detail')

    class Meta:
        model = Tweet
        fields = ['id', 'url', 'user', 'context', 'images']

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        tweet = Tweet.objects.create(**validated_data)
        if images_data:
            for image in images_data.values():
                Image.objects.create(tweet=tweet, image=image)
        return tweet
