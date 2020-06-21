from django import forms
from .models import Tweet


class TweetForm(forms.ModelForm):
    images = forms.ImageField(widget=forms.ClearableFileInput(
        attrs={'multiple': True}), required=False)

    class Meta:
        model = Tweet
        fields = ['context', 'images']

    def clean_context(self):
        context = self.cleaned_data.get('context')
        if len(context) > 241:
            raise forms.ValidationError("Your tweet is more than 240\
                                        character."
                                        )
        return context
