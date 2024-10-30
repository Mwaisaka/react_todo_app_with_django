from django.db import models
from django.utils.timezone import now
# from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.hashers import make_password

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=255)    
    completed = models.BooleanField(default=False)
    create_date = models.DateField(null=False, blank=True, default=now)
    due_date = models.DateField(null=True, blank=True)  
    
    def __str__(self):
        return f'{self.task} - {self.completed}'

# class CustomUser(AbstractUser):
#     fullname = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     def save(self, *args, **kwargs):
#         if self.password:
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)
#     def __str__(self):
#         return f'{self.username}'    
