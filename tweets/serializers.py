from rest_framework import serializers
from .models import Tweet, Image
from django.conf import settings


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    context = serializers.CharField(required=False, allow_blank=True)

    def validated_action(self, action):
        action = action.lower().strip()
        if action not in settings.TWEET_ACTIONS:
            raise serializers.ValidationError(
                "Invalid Action"
            )
        return action


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class TweetSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    images = ImageSerializer(
        source='image_set', many=True, read_only=True
    )
    url = serializers.HyperlinkedIdentityField(view_name='tweet:tweet-detail')
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id', 'url', 'user', 'context', 'images', 'likes']

    def create(self, validated_data):
        images_data = self.context.get('request').FILES
        # images_data = self.context.get('view').request.FILES
        tweet = Tweet.objects.create(**validated_data)
        if images_data:
            for image in images_data.values():
                Image.objects.create(tweet=tweet, image=image)
        return tweet

    def validate_content(self, context):
        if len(context) > 241:
            raise serializers.ValidationError("Tweet is more than 240\
                                        character."
                                              )
        return context

    def get_likes(self, obj):
        return obj.likes.count()


class TweetReadSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username', read_only=True)
    images = ImageSerializer(source='image_set', many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='tweet:tweet-detail')
    likes = serializers.SerializerMethodField(read_only=True)
    parent_tweet = TweetSerializer(read_only=True, source='retweet')

    class Meta:
        model = Tweet
        fields = ['id', 'url', 'user', 'context',
                  'images', 'likes', 'is_retweet', 'parent_tweet']

    def get_likes(self, obj):
        return obj.likes.count()
