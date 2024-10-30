from django.db import models
from django.utils.timezone import now
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=255)    
    completed = models.BooleanField(default=False)
    create_date = models.DateField(null=False, blank=True, default=now)
    due_date = models.DateField(null=True, blank=True)  
    
    def __str__(self):
        return f'{self.task} - {self.completed}'
    
class Subscriber(models.Model):
    username = models.CharField(max_length=255, unique=True)
    fullname = models.CharField(max_length=255)
    email=models.EmailField(max_length=255, unique=True)
    create_date = models.DateField(null=False, blank=True, default=now)
    password = models.CharField(max_length=255)  # Store hashed password here
    
    def save(self, *args, **kwargs):
        if not self.pk:  # Only hash the password if it's a new object
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.username} - {self.email}'

  
