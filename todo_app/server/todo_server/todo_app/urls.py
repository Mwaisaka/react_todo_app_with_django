from django.urls import path
from . import views

urlpatterns = [
    
    path('todo_app/',views.todo, name='todo_app'),
]
