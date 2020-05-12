<h1 align="center"><img align="center" width="300" src="static/images/logo.png" alt="iTweet logo"></h1>


## 🚀 Features

- Django 3.0.x
- [Pipenv](https://pipenv.pypa.io/en/latest/) for dependencies and virtualenvs
- [django-allauth](https://github.com/pennersr/django-allauth) for user registration
- [Whitenoise](http://whitenoise.evans.io/en/stable/index.html) for static files
- [Bootstrap v4](https://github.com/twbs/bootstrap) for styling
- [django-debug-toolbar](https://github.com/jazzband/django-debug-toolbar) for debugging
- [django-crispy-forms](https://github.com/django-crispy-forms/django-crispy-forms) for DRY forms

## 📖 Install

```
$ git clone https://github.com/ycv005/iTweet.git
$ cd iTweet
$ pipenv install
$ pipenv shell

# Run Migrations
(iTweet) $ python manage.py migrate

# Create a Superuser:
(iTweet) $ python manage.py createsuperuser

# Confirm everything is working:
(iTweet) $ python manage.py runserver

# Load the site at http://127.0.0.1:8000
```

## ⭐️ Show your support

Give a ⭐️ if this project helped you!