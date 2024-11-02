from django.contrib import admin
from .models import Task, Subscriber
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ("task", "create_date", "completed","due_date",)

admin.site.register(Task, TaskAdmin)

class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("username","fullname","email","create_date",)


class CustomUserAdmin(UserAdmin):
    model = Subscriber
    list_display = ('username', 'email', 'fullname', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('fullname',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('fullname',)}),
    )

admin.site.register(Subscriber, CustomUserAdmin)