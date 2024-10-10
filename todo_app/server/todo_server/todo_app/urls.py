from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='todo_app'),
    path('todo_app/',views.todo, name='todo_app'),
]
