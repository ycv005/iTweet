from django.db import models
from django.conf import settings
import os


def user_directory_path(instance, filename):
    base_name = os.path.basename(filename)
    name, ext = os.path.splitext(base_name)

    return ('tweet/user/' +
            str(instance.tweet.user.id) + "/" + str(instance.tweet.id) +
            "/" + "IMG_" + str(instance.tweet.id) + ext
            )


class Tweet(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    context = models.TextField(max_length=240)
    likes = models.IntegerField(default=0)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            "id": self.id,
            "context": self.context,
            "like": self.likes
        }


class Image(models.Model):
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=user_directory_path,
        null=True,
        blank=True
    )
