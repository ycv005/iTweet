# Generated by Django 3.0.6 on 2020-06-22 12:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0005_auto_20200621_2225'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='retweet',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tweets.Tweet'),
        ),
    ]