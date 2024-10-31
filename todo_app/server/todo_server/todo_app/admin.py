from django.contrib import admin
from .models import Task, Subscriber

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ("task", "create_date", "completed","due_date",)

admin.site.register(Task, TaskAdmin)

class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("username","fullname","email","create_date","password",)

admin.site.register(Subscriber, SubscriberAdmin)