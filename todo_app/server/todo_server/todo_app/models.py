from django.db import models
from django.utils.timezone import now

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=255)    
    completed = models.BooleanField(default=False)
    create_date = models.DateField(null=False, blank=True, default=now)
    due_date = models.DateField(null=True, blank=True)  
    
    def __str__(self):
        return self.task

    