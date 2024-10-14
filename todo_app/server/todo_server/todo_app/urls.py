from django.urls import path
from . import views

urlpatterns = [
    # path('',views.home, name='todo_app'),
    path('',views.todo, name='todo'),
    path('tasks/',views.tasks, name='todo'),
]
