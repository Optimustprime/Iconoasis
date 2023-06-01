import secrets
import uuid
import os
from django.contrib.sites.shortcuts import get_current_site
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.conf import settings
from django.core.mail import EmailMessage
from django.urls import reverse


def recipe_image_file_path(instance, filename):
    """Generate file path for new image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'recipe', filename)


class UserManager(BaseUserManager):
    def create_user(self, request, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email Address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.is_active = False
        # Generate a unique activation token
        token = secrets.token_hex(16)

        # Save the token with the user's email address
        user.activation_token = token
        user.save(using=self._db)
        activation_link = reverse('core:activate', kwargs={'token': token})
        email_subject = 'Activate your account'
        current_site = get_current_site(request)
        email_body = f'Please click the following link to activate your account: http://{current_site.domain}{activation_link}'
        email = EmailMessage(subject=email_subject, body=email_body, to=[email],
                             from_email='landingpage@jaromtravels.com')
        print(activation_link)
        email.send()

        return user

    def create_super_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError('User must have an email Address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def activate(self, token):
        try:
            user = self.get(activation_token=token)
        except User.DoesNotExist:
            return None

        user.is_active = True
        user.activation_token = None
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_super_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    activation_token = models.CharField(max_length=32, null=True, blank=True)
    is_active = models.BooleanField(default=None)
    is_staff = models.BooleanField(default=False)
    image = models.ImageField(null=True, upload_to=recipe_image_file_path)

    objects = UserManager()
    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email


class Recipe(models.Model):
    """Recipe object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    time_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    link = models.CharField(max_length=255, blank=True)
    tag = models.ManyToManyField('Tag')  # manytomany because we can have many tags to many recipes

    def __str__(self):
        return self.title


class Tag(models.Model):
    """Tag for filtering recipes."""
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class SubscribeEmail(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email
